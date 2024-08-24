import os

from quart import Quart, jsonify, render_template
from quart_cors import cors

from api_server import BASE_PROJECT, get_debug

app = Quart(__name__, root_path=BASE_PROJECT)
app_cors = cors(
    app,
    allow_credentials=True,
    allow_origin=[
        'http://127.0.0.1:8000'
    ]
)

app_cors.config.update(SECRET_KEY=os.getenv('SECRET_KEY'))


@app.route('/')
async def home():
    return await render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)
