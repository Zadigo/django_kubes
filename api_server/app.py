import os

from quart import Quart, jsonify
from quart_cors import cors

from api_server import BASE_PROJECT

app = Quart(__name__, root_path=BASE_PROJECT)
app_cors = cors(
    app,
    allow_origin=[
        'http://127.0.0.1:8000'
    ]
)

app_cors.config.update(SECRET_KEY=os.getenv('SECRET_KEY'))


@app.route('/home')
def home():
    return jsonify({'state': True})


if __name__ == '__main__':
    app.run(debug=os.getenv('DEBUG', False))
