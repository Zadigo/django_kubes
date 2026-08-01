package routes

import (
	"context"
	"django_kubes/simple_go/internal/models"
)

type RouteInterface interface {
	SetContext(ctx context.Context)
	SetApp(app models.AppInterface)
}
