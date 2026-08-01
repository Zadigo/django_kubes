from contextlib import asynccontextmanager

import httpx2
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.websockets import WebSocket, WebSocketDisconnect

from clients import WebsocketClient
from handlers import create_handler_chain
from models import ReceiveMessage, Todo

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
    async with httpx2.AsyncClient() as client:
        response = await client.get("https://jsonplaceholder.typicode.com/todos")
        return [Todo(**item) for item in response.json()]


@app.websocket("/v1/todos/ws")
async def todos_websocket(websocket: WebSocket):
    await websocket.accept()

    client = WebsocketClient(websocket)
    CLIENTS.add(client)

    handler = create_handler_chain(client)

    try:
        while True:
            message = await websocket.receive_json()
            data = ReceiveMessage(**message)
            await handler.handle(data)
    except WebSocketDisconnect:
        CLIENTS.remove(client)
        await websocket.close()
