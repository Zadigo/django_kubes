package backend

import (
	"context"

	"github.com/redis/go-redis/v9"
)

func RedisClient() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
		DB:   0,
	})

	err := client.Ping(context.Background()).Err()
	if err != nil {
		panic(err)
	}

	return client
}
