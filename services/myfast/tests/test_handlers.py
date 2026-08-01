from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app import app
from clients import ReceiveActions
from handlers import AbstractHandler, create_handler_chain

FIXTURE_DIR = Path("tests/fixtures")

client = TestClient(app)

ALL_IMAGES = pytest.mark.datafiles(
    FIXTURE_DIR / 'img1.jpg',
    FIXTURE_DIR / 'img2.jpg',
    FIXTURE_DIR / 'img3.jpg',
)

@ALL_IMAGES
async def test_create_handler():
    handler = await create_handler_chain(client)

    assert handler is not None
    assert hasattr(handler, "handle")
    assert isinstance(handler, AbstractHandler)
    assert handler.redis is not None


class TestTodoHandler:
    @pytest.fixture(autouse=True)
    async def setup_handler(self):
        self.handler = await create_handler_chain(client)

    @pytest.mark.parametrize("action", [ReceiveActions.TODOS])
    async def test_handle(self, action):
        await self.handler.handle({"action": action.value})

        if action.value == 'todos':
            pass


