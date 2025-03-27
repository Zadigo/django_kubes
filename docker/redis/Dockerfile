FROM redis

COPY redis.conf /usr/local/etc/redis/redis.conf

RUN rm -rf redis.log && touch redis.log

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "redis-cli", "ping" ]

CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
