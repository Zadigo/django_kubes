package tests

import (
	"django_kubes/simple_go/internal/backend"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRedisClient(t *testing.T) {
	client := backend.RedisClient()
	assert.NotNil(t, client)
}
