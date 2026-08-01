import os
import pathlib
from logging.config import dictConfig

import dotenv

BASE_PROJECT = pathlib.Path(__file__).parent.absolute()

env_path = BASE_PROJECT / '.env'
if env_path.exists():
    dotenv.load_dotenv(env_path)


def debug_mode():
    debug = os.getenv('DEBUG')
    return True if debug == '1' else False


def get_host():
    if debug_mode():
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
            'filename': BASE_PROJECT / 'quartserver.log',
            'formatter': 'default'
        }
    },
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi', 'file']
    }
})
