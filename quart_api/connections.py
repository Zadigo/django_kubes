import os
import logging
import redis


class ConnectRedis:
    def __init__(self):
        self.app = None
        self.conn = None
        self.params = {
            'host': os.getenv('REDIS_HOST', 'localhost'),
            'port': os.getenv('REDIS_PORT', 6379),
            'password': os.getenv('REDIS_PASSWORD')
        }

    def __call__(self, app):
        self.app = app
        self.conn = redis.Redis(**self.params)
        try:
            self.conn.ping()
        except:
            logging.error('Could not connect to Redis server')


REDIS_CONNECTION = ConnectRedis()
