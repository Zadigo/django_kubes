import os
import logging
import redis
from quart_api import debug_mode
# from pymemcache.client.base import Client


class ConnectRedis:
    """Wrapper that adds redis connection
    to the Quart application"""

    def __init__(self):
        self.app = None
        self.conn = None
        self.params = {
            'host': os.getenv('REDIS_HOST', '127.0.0.1'),
            'port': os.getenv('REDIS_PORT', '6379'),
            'password': os.getenv('REDIS_PASSWORD')
        }

    def __call__(self, app):
        self.app = app
        self.conn = redis.Redis(**self.params)

        try:
            self.conn.ping()
        except:
            logging.error('Could not connect to Redis')

        setattr(app, 'redis', self.conn)
        return app


class ConnectMemcache:
    def __init__(self):
        self.app = None
        self.debug = debug_mode()

        try:
            if self.debug:
                self.conn = Client(('127.0.0.1', 11211))
            else:
                host = os.getenv('MEMCACHE_HOST', 'memcache')
                self.conn = Client(f'{host}:11211')
        except:
            logging.error('Could not connect to memcache')

    def __call__(self, app):
        self.app = app
        setattr(app, 'memcache', self.conn)
        return app


connect_redis = ConnectRedis()

# connect_memcache = ConnectMemcache()
