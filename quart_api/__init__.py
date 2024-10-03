import os
import dotenv
import pathlib

BASE_PROJECT = pathlib.Path(__file__).parent.absolute()

dotenv.load_dotenv(BASE_PROJECT / '.env')


def get_debug():
    debug = os.getenv('DEBUG')
    return True if debug == '1' else False
