from fastapi.testclient import TestClient

from app import app
from backends import redis_client

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


def test_webscoket_todos():
    with client.websocket_connect("/v1/todos/ws") as websocket:
        # Send a message to the WebSocket server
        websocket.send_json({"action": "todos"})

        # Receive a message from the WebSocket server
        response = websocket.receive_json()

        assert response["action"] == "todos"
        assert isinstance(response["data"], list)
