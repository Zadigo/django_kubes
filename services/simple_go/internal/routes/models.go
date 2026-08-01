package routes

import (
	"context"
	"django_kubes/simple_go/internal/models"
)

type BaseRoute struct {
	RouteInterface
	ctx context.Context
	app models.AppInterface
}

func (b *BaseRoute) SetApp(app models.AppInterface) {
	b.app = app
}

func (b *BaseRoute) SetContext(ctx context.Context) {
	b.ctx = ctx
}
