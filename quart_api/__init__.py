import os
import pathlib
from logging.config import dictConfig

import dotenv

BASE_PROJECT = pathlib.Path(__file__).parent.absolute()


def get_debug():
    env_path = BASE_PROJECT / '.env'
    if env_path.exists():
        dotenv.load_dotenv(BASE_PROJECT / '.env')

    debug = os.getenv('DEBUG')
    return True if debug == '1' else False


def get_host():
    debug = get_debug()
    if debug:
        return None
    return '0.0.0.0'


dictConfig({
    'version': 1,
    'formatters': {
        'default': {
            'format': '[%(asctime)s] %(levelname)s: %(message)s',
        }
    },
    'handlers': {
        'wsgi': {
            'class': 'logging.StreamHandler',
            'stream': 'ext://flask.logging.wsgi_errors_stream',
            'formatter': 'default'
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': BASE_PROJECT / 'quart_server.log',
            'formatter': 'default'
        }
    },
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi', 'file']
    }
})
