import abc
import asyncio

import httpx2
import redis

from backends import redis_client
from clients import ReceiveActions, SendActions, WebsocketClient
from models import ReceiveMessage, Todo

ACTIVE_TASKS: set[asyncio.Task] = set()

TASK_ERRORS: set[asyncio.Task] = set()

LOCK = asyncio.Lock()


class AbstractHandler(abc.ABC):
    """A base class for handling WebSocket messages in 
    a chain of responsibility pattern."""

    def __init__(self, client: WebsocketClient):
        self.client = client
        self._next_handler: AbstractHandler | None = None

    @abc.abstractmethod
    async def set_next(self, handler: AbstractHandler):
        """Set the next handler in the chain."""
        self._next_handler = handler

    @abc.abstractmethod
    async def handle(self, data: ReceiveMessage):
        """Logic to handle the incoming WebSocket message.
        If the handler cannot process the message, it should pass
        it to the next handler in the chain."""
        if self._next_handler is not None:
            await self._next_handler.handle(data)


class TodoHandler(AbstractHandler):
    def __init__(self, client: WebsocketClient):
        super().__init__(client)

        self.redis: redis.Redis | None = None

    async def set_next(self, handler: AbstractHandler):
        await super().set_next(handler)

    async def get_todos(self):
        async with httpx2.AsyncClient() as client:
            response = await client.get("https://jsonplaceholder.typicode.com/todos")
            values = [Todo(**item) for item in response.json()]

            # Publish to a Redis channel that 
            # subscribers can listen to
            async def publisher_task():
                todos = asyncio.Queue()

                for value in values:
                    await todos.put(value)

                while not todos.empty():
                    todo: Todo = await todos.get()
                    if self.redis is not None:
                        try:
                            self.redis.publish("todos_channel", str(todo.model_dump()))
                        except Exception as e: # noqa
                            async with LOCK:
                                TASK_ERRORS.add(str(e))
                    await asyncio.sleep(1)

            async with asyncio.TaskGroup() as tg:
                task = tg.create_task(publisher_task())
                ACTIVE_TASKS.add(task)

                task.add_done_callback(lambda t: ACTIVE_TASKS.discard(t))

    async def handle(self, data: ReceiveMessage):
        if data.action == ReceiveActions.TODOS.value:
            await self.get_todos()
            await self.client.send_message(SendActions.TODOS, message="Handling todos action")
        elif self._next_handler is not None:
            await self._next_handler.handle(data)
        else:
            await self.client.send_error("No handler found for the action")


async def create_handler_chain(client: WebsocketClient) -> AbstractHandler:
    redis = redis_client()

    todo_handler = TodoHandler(client)
    todo_handler.redis = redis

    # You can add more handlers here and chain them
    return todo_handler
