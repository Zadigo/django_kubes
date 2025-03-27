import asyncio
import json
import os

import firebase_admin
import requests
from firebase_admin import firestore
from firebase_admin.credentials import ApplicationDefault
from hypercorn.asyncio import serve
from hypercorn.config import Config
from quart import Quart, jsonify, render_template, websocket
from quart_cors import cors

from quart_api import BASE_PROJECT, debug_mode, get_host
from quart_api.connections import connect_redis

app = Quart(__name__, root_path=BASE_PROJECT)
cors_app = cors(
    app,
    allow_credentials=True,
    allow_origin=[
        'http://127.0.0.1:8000',
        'http://localhost:5173',
        'http://johpm.fr'
    ]
)


cors_app.config.update(SECRET_KEY=os.getenv('SECRET_KEY'))

cors_app = connect_redis(cors_app)


@cors_app.before_serving
def initialize_storages():
    # firebase_app = firebase_admin.initialize_app()
    # db = firestore.client()

    defaults = ApplicationDefault()
    firebase_admin.initialize_app(defaults)
    db = firestore.client()
    setattr(cors_app, 'firedb', db)


@cors_app.route('/')
async def initial_home():
    return await render_template('home.html')


@cors_app.route('/api/v1/test-2')
async def test_endpoint():
    try:
        response = requests.get(
            'https://jsonplaceholder.typicode.com/comments')
    except:
        return jsonify([])
    else:
        data = json.dumps(response.json())
        cors_app.redis.set('comments', data)
        return jsonify(data)


@cors_app.websocket('/ws/test')
async def test_websocket():
    counter = 0
    await websocket.accept()
    while True:
        try:
            data = websocket.receive_json()
        except asyncio.CancelledError:
            await websocket.close(1000)
            break
        except Exception:
            await websocket.close(1000)
            break
        else:
            counter = counter + 1
            await websocket.send_json({'state': True, 'counter': 1})
            await asyncio.sleep(40)


@cors_app.post('/api/v1/test')
async def test_quart():
    return jsonify({'state': True})


@cors_app.get('/api/v1/firebase')
async def test_firebase():
    ref = cors_app.firedb.collection('toys')
    doc = ref.document('something')
    doc.set({'a': 1, 'user': {'id': 1}})
    return {}, 200


if __name__ == '__main__':
    if debug_mode():
        cors_app.run(host=get_host(), debug=debug_mode())
    else:
        config = Config()
        production_config = config.from_toml(BASE_PROJECT / 'hypercorn.toml')
        asyncio.run(serve(cors_app, production_config))
