import abc
import enum
import uuid

from fastapi import WebSocket
from pydantic import BaseModel

from models import SendMessage


class ReceiveActions(enum.Enum):
    TODOS = 'todos'


class SendActions(enum.Enum):
    TODOS = 'todos'
    ERROR = 'error'


class AbstractWebsocketClient(abc.ABC):
    """A base class for WebSocket clients to handle sending and receiving messages.

    Attributes:
        websocket (WebSocket): The WebSocket connection.
        uuid (uuid.UUID): A unique identifier for the client instance.
        message_model (type[SendMessage]): The Pydantic model used for sending and validating messages.
    """
    message_model: type[SendMessage] = SendMessage

    def __init__(self, websocket: WebSocket):
        self.websocket = websocket
        self.uuid = uuid.uuid4()

    def __hash__(self):
        return hash(self.uuid)

    def __repr__(self):
        return f"WebsocketClient(uuid={self.uuid})"

    def __eq__(self, other: object):
        if not isinstance(other, AbstractWebsocketClient):
            return False
        return self.uuid == other.uuid

    async def send_message(self, action: SendActions, data: dict | BaseModel | None = None, message: str | None = None):
        """Send a message back to the WebSocket client."""
        if isinstance(data, BaseModel):
            data = data.model_dump()
        await self.websocket.send_json({'action': action.value, 'data': data, 'message': message})

    async def send_error(self, message: str):
        """Send an error message back to the WebSocket client."""
        await self.send_message(SendActions.ERROR, message=self.message_model(message=message))


class WebsocketClient(AbstractWebsocketClient):
    """A wrapper around the WebSocket connection to 
    handle sending and receiving messages."""
