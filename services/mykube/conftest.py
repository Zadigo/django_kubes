import environ
from django.conf import settings

environ.Env.read_env('.env')


env = environ.Env()


def pytest_configure(config):
    if not settings.configured:
        settings.configure(
            DEBUG=True,
            SECRET_KEY='aXDfw6xCDKIFRgz2yzpTgAqFBqVLgSeyOVGayj8KqcJAjG3O96dT7cQPMExxAteX',
            DATABASES={
                'default': {
                    'ENGINE': 'django.db.backends.postgresql',
                    'NAME': env('DB_NAME'),
                    'USER': env('DB_USER'),
                    'PASSWORD': env('DB_PASSWORD'),
                    'HOST': env('DB_HOST'),
                    'PORT': env.int('DB_PORT', default=5432)
                }
            },
            INSTALLED_APPS=[
                'whitenoise.runserver_nostatic',
                'django.contrib.admin',
                'django.contrib.auth',
                'django.contrib.contenttypes',
                'django.contrib.sessions',
                'django.contrib.messages',
                'django.contrib.staticfiles',
                'django.contrib.sitemaps',
                'django.contrib.sites',
            ]
        )
