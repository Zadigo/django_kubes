from unittest.mock import Mock, patch

from fastapi.testclient import TestClient
from httpx2 import AsyncClient

from app import app
from backends import redis_client
from handlers import ACTIVE_TASKS

client = TestClient(app)

def test_get_todos():
    redis = redis_client()
    redis.flushdb()  # Clear the Redis database before the test

    response = client.get("/v1/todos")

    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

    # Hit the cache by making the same request again
    response_cached = client.get("/v1/todos")
    assert response_cached.status_code == 200


FAKE_TODO = {
    'userId': 4, 
    'id': 74, 
    'title': 'expedita tempore nobis eveniet laborum maiores', 
    'completed': False
}

@patch.object(AsyncClient, 'get')
def test_websocket_todos(mget: Mock):
    mget.return_value.json = lambda: [FAKE_TODO]

    with client.websocket_connect("/v1/todos/ws") as websocket:
        # Send a message to the WebSocket server
        websocket.send_json({"action": "todos"})

        print(ACTIVE_TASKS)
        # Receive a message from the WebSocket server
        response = websocket.receive_json()

        # assert len(ACTIVE_TASKS) > 0

        # assert response["action"] == "todos"
        # assert isinstance(response["data"], list)

        # assert len(ACTIVE_TASKS) == 0
        print(ACTIVE_TASKS)
