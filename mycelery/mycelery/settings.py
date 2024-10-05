import os
import dotenv
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')


def get_debug():
    debug_value = os.getenv('DEBUG')
    state = True if debug_value == '1' else False

    if state:
        dotenv.load_dotenv(BASE_DIR / '.env')
    return state


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = get_debug()

ALLOWED_HOSTS = [
    '127.0.0.1',
    '176.31.162.80',
    'johnpm.fr',
    'app.johnpm.fr'
]


# Application definition

INSTALLED_APPS = [
    'whitenoise.runserver_nostatic',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django_celery_beat'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware'
]

ROOT_URLCONF = 'mycelery.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mycelery.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': '5432'
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

STATIC_ROOT = BASE_DIR / 'static'

MEDIA_URL = 'media/'

MEDIA_ROOT = BASE_DIR / 'media'


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


if not DEBUG:
    # Use Redis as backend for caching instead of
    # the file system caching that we use for debugging
    REDIS_PASSWORD = os.getenv('REDIS_PASSWORD')

    REDIS_URL = f'redis://:{REDIS_PASSWORD}@redis:6379'

    RABBITMQ_HOST = os.getenv('RABBITMQ_HOST')

    RABBITMQ_USER = os.getenv('RABBITMQ_DEFAULT_USER')

    RABBITMQ_PASSWORD = os.getenv('RABBITMQ_DEFAULT_PASS')

    CELERY_BROKER_URL = f'amqp://{RABBITMQ_USER}:{
        RABBITMQ_PASSWORD}@rabbitmq:5672'

    CELERY_RESULT_BACKEND = f'redis://:{REDIS_PASSWORD}@redis:6379'
else:
    CELERY_BROKER_URL = 'amqp://guest:guest@localhost:5672'

    CELERY_RESULT_BACKEND = 'rpc://'


CELERY_ACCEPT_CONTENT = ['json']

CELERY_TASK_SERIALIZER = 'json'

CELERY_RESULT_SERIALIZER = 'json'

CELERY_TIMEZONE = 'Europe/Oslo'


if os.getenv('USES_HTTP_SCHEME', 'http') == 'https':
    SESSION_COOKIE_SECURE = True

    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

    SECURE_PROXY_SSL_HEADERSSL_REDIRECT = True


STORAGES = {
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage'
    }
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'level': 'INFO'
        },
        'file': {
            'class': 'logging.FileHandler',
            'level': 'WARNING',
            'filename': 'mycelery/django_debug.log'
        },
        # 'failed_requests': {
        #     'class': 'logging.FileHandler',
        #     'level': 'WARNING',
        #     'filename': 'prosite/failed_requests.log'
        # }
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'propagate': True
        },
        # 'django.request': {
        #     'handlers': ['failed_requests'],
        #     'filters': ['failed_request_filter'],
        #     'formatter': 'failed',
        #     'propagate': False
        # }
    },
    'formatters': {
        'failed': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s',
            'style': '%'
        }
    },
    # 'filters': {
    #     'failed_request_filter': {
    #         '()': 'prosite.custom_logging.FailedRequestFilter'
    #     }
    # }
}
