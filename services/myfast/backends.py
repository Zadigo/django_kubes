import redis


def redis_client():
    instance = redis.from_url("redis://@localhost:6379/0", decode_responses=True)

    try:
        instance.ping()
    except Exception as e:
        print(f"Redis connection error: {e}")
        raise

    return instance
