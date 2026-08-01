import pytest
from fastapi.testclient import TestClient

from app import app
from clients import SendActions, WebsocketClient


@pytest.fixture
def websocket():
    client = TestClient(app)

    with client.websocket_connect("/v1/todos/ws") as ws:
        yield ws


async def test_should_instantiate_client(websocket):
    client = WebsocketClient(websocket)
    assert isinstance(client, WebsocketClient)


async def test_should_send_and_receive_message(websocket):
    client = WebsocketClient(websocket)

    # Send a message to the WebSocket server
    await client.send_message(SendActions.ERROR, data={"key": "value"})

    # Receive a message from the WebSocket server
    response = websocket.receive_json()

    assert response["action"] == "test_action"
    assert response["data"] == {"key": "value"}
