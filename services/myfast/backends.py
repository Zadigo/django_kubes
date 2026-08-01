import aioredis
from asgiref.sync import async_to_sync


async def redis_client():
    instance = await aioredis.from_url("redis://@localhost:6379/0", decode_responses=True)

    try:
        await instance.ping()
    except Exception as e:
        print(f"Redis connection error: {e}")
        raise

    return instance


def sync_redis_client():
    """Returns the redis client instance in a synchronous context."""
    return async_to_sync(redis_client)()
