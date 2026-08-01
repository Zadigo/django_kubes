package tests

import (
	"context"
	"django_kubes/simple_go/internal/app"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestNewApp(t *testing.T) {
	app := app.NewApp(t.Context())
	assert.NotNil(t, app)
}

func TestStartApp(t *testing.T) {
	ctx, cancel := context.WithTimeout(t.Context(), 10*time.Second)
	defer cancel()

	app := app.NewApp(ctx)
	assert.NotNil(t, app)

	err := app.Start()
	assert.NoError(t, err)
}
