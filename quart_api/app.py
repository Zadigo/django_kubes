import asyncio
import logging
import os

from hypercorn.asyncio import serve
from hypercorn.config import Config
from quart import Quart, jsonify, redirect, render_template, websocket
from quart_cors import cors

from quart_api import BASE_PROJECT, debug_mode, get_host
from quart_api.connections import REDIS_CONNECTION

app = Quart(__name__, root_path=BASE_PROJECT)
cors_app = cors(
    app,
    allow_credentials=True,
    allow_origin=[
        'http://127.0.0.1:8000',
        'http://johpm.fr'
    ]
)


cors_app.config.update(SECRET_KEY=os.getenv('SECRET_KEY'))


@cors_app.before_serving
def create_connections():
    REDIS_CONNECTION(cors_app)


@cors_app.route('/')
async def initial_home():
    return await render_template('home.html')


@cors_app.websocket('/ws/test')
async def test_websocket():
    await websocket.accept()
    while True:
        try:
            data = websocket.receive_json()
        except asyncio.CancelledError:
            await websocket.close(1)
        except Exception:
            await websocket.close(1)
        else:
            await websocket.send({'state': True})
            await asyncio.sleep(40)


if __name__ == '__main__':
    if debug_mode():
        cors_app.run(host=get_host(), debug=debug_mode())
    else:
        config = Config()
        production_config = config.from_toml(BASE_PROJECT / 'hypercorn.toml')
        asyncio.run(serve(cors_app, production_config))
