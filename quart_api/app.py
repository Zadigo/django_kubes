import os
import logging
import asyncio
from quart import Quart, jsonify, render_template, redirect
from quart_cors import cors
from hypercorn.config import Config
from hypercorn.asyncio import serve
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


if __name__ == '__main__':
    if debug_mode():
        cors_app.run(host=get_host(), debug=debug_mode())
    else:
        config = Config()
        production_config = config.from_toml(BASE_PROJECT / 'hypercorn.toml')
        asyncio.run(serve(cors_app, production_config))
