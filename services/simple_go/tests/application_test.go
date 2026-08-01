package tests

import (
	"django_kubes/simple_go/internal/app"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNewApp(t *testing.T) {
	app := app.NewApp(t.Context())
	assert.NotNil(t, app)
}
