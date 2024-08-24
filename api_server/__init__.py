import dotenv
import pathlib

BASE_PROJECT = pathlib.Path(__file__).parent.absolute()

dotenv.load_dotenv(BASE_PROJECT / '.env')
