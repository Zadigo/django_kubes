import os
import dotenv
from pathlib import Path
import mimetypes

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env_path = BASE_DIR / '.env'
if env_path.exists():
    dotenv.load_dotenv(env_path)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')


def get_debug():
    debug_value = os.getenv('DEBUG')
    state = True if debug_value == '1' else False
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
    'daphne',
    # 'whitenoise.runserver_nostatic',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django_celery_beat',
    'django_extensions',

    'channels',
    'import_export',
    'corsheaders',

    'schools'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # 'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'mycelery.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'templates'
        ],
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

# WSGI_APPLICATION = 'mycelery.wsgi.application'
ASGI_APPLICATION = 'mycelery.asgi.application'


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


# S3
# https://forum.djangoproject.com/t/static-path-with-s3/28696/9
# https://levelup.gitconnected.com/hosting-django-static-files-in-aws-using-s3-and-cloudfront-a-comprehensive-guide-2f8f5d0a845c

USE_S3 = False

if USE_S3:
    AWS_LOCATION = os.getenv('AWS_LOCATION')

    AWS_S3_FILE_OVERWRITE = False

    AWS_DEFAULT_ACL = 'public-read'

    AWS_QUERYSTRING_AUTH = False

    AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')

    AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"

    AWS_S3_REGION_NAME = os.getenv('AWS_S3_REGION_NAME')

    AWS_S3_ACCESS_KEY_ID = os.getenv('AWS_S3_ACCESS_KEY_ID')

    AWS_S3_SECRET_ACCESS_KEY = os.getenv('AWS_S3_SECRET_ACCESS_KEY')

    STORAGES = {
        'default': {
            'BACKEND': 'mycelery.custom_storages.MediaStorage'
        },
        'staticfiles': {
            'BACKEND': 'mycelery.custom_storages.StaticStorage'
        }
    }

    AWS_S3_OBJECT_PARAMETERS = {
        'ACL': 'public-read',
        'CacheControl': 'max-age=2592000'
    }

    AWS_CLOUDFRONT_DISTRIBUTION = os.getenv('AWS_CLOUDFRONT_DISTRIBUTION')


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

if USE_S3:
    STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/static/"

    MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/media/"
else:
    MEDIA_URL = 'media/'

    STATIC_URL = 'static/'

MEDIA_ROOT = BASE_DIR / 'media'

STATIC_ROOT = BASE_DIR / 'staticfiles'

STATICFILES_DIRS = [
    BASE_DIR / 'static'
]


# Whitenoise

# STORAGES = {
#     'staticfiles': {
#         'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage'
#     }
# }

# WHITENOISE_MIMETYPES = {
#     '.js': 'text/javascript'
# }

# mimetypes.add_type('text/plain', '.css')
# mimetypes.add_type('text/plain', '.js')


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Redis

REDIS_HOST = os.getenv('REDIS_HOST', '127.0.0.1')

REDIS_PASSWORD = os.getenv('REDIS_PASSWORD')

REDIS_URL = f'redis://:{REDIS_PASSWORD}@{REDIS_HOST}:6379'

RABBITMQ_HOST = os.getenv('RABBITMQ_HOST', 'localhost')

RABBITMQ_USER = os.getenv('RABBITMQ_DEFAULT_USER', 'guest')

RABBITMQ_PASSWORD = os.getenv('RABBITMQ_DEFAULT_PASS', 'guest')

CELERY_BROKER_URL = f'amqp://{RABBITMQ_USER}:{RABBITMQ_PASSWORD}@{RABBITMQ_HOST}:5672'

CELERY_RESULT_BACKEND = REDIS_URL

CELERY_ACCEPT_CONTENT = ['json']

CELERY_TASK_SERIALIZER = 'json'

CELERY_RESULT_SERIALIZER = 'json'

CELERY_TIMEZONE = 'Europe/Oslo'


if os.getenv('USES_HTTP_SCHEME', 'http') == 'https':
    SESSION_COOKIE_SECURE = True

    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

    SECURE_PROXY_SSL_HEADERSSL_REDIRECT = True


# Logging

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


# CORS

CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGIN_REGEXES = [
    r'https://*.ngrok-free.app'
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://johnpm.fr',
    'http://app.johnpm.fr',
    'http://uptime.johnpm.fr',
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',
    'http://johnpm.fr',
    'http://app.johnpm.fr',
    'http://uptime.johnpm.fr',
]


# Restframework

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication'
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema'
}


# Cache

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': REDIS_URL,
        'TIMEOUT': 60 * 15,
        'OPTIONS': {
            'PASSWORD': REDIS_PASSWORD,
            'CLIENT_CLASS': 'django_redis.client.DefaultClient'
        }
    },
    'memcache': {
        'BACKEND': 'django.core.cache.backends.memcached.PyMemcacheCache',
        'LOCATION': 'memcache:11211'
    }
}
