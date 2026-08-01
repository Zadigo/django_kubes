from contextlib import asynccontextmanager

import httpx2
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.websockets import WebSocket, WebSocketDisconnect

from backends import redis_client
from clients import WebsocketClient
from handlers import create_handler_chain
from models import ReceiveMessage, Todo

STORAGE_KEY: str = 'myfast:{value}'

CLIENTS: set[WebsocketClient] = set()


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(
    title="FastAPI Todo App",
    description="A simple Todo application built with FastAPI",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/v1/todos")
async def todos() -> list[Todo]:
    storage_key = STORAGE_KEY.format(value='todos')
    redis = redis_client()
    data = redis.lrange(storage_key, 0, -1)

    if not data:
        async with httpx2.AsyncClient() as client:
            response = await client.get("https://jsonplaceholder.typicode.com/todos")
            data = [Todo(**item) for item in response.json()]
        redis.lpush(storage_key, *[str(item.model_dump()) for item in data])
    else:
        data = [Todo(**eval(item)) for item in data]

    return data


@app.websocket("/v1/todos/ws")
async def todos_websocket(websocket: WebSocket):
    await websocket.accept()

    client = WebsocketClient(websocket)
    CLIENTS.add(client)

    handler = await create_handler_chain(client)

    try:
        while True:
            message = await websocket.receive_json()
            data = ReceiveMessage(**message)
            await handler.handle(data)
    except WebSocketDisconnect:
        CLIENTS.remove(client)
        await websocket.close()
