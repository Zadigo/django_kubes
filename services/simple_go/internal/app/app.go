package app

import (
	"context"
	"django_kubes/simple_go/internal/models"

	"github.com/go-chi/chi"
)

type App struct {
	ctx    context.Context
	router *chi.Mux
}

func (a *App) Start() error {
	return nil
}

func NewApp(ctx context.Context) models.AppInterface {
	appCtx, cancel := context.WithCancel(ctx)
	defer cancel()

	app := &App{
		ctx:    appCtx,
		router: nil,
	}

	return app
}
