package internal

import (
	"context"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
)

type App struct {
	ctx context.Context
	router *chi.Mux
	errCh chan error
}

func (a *App) Start() {	
	a.router = chi.NewRouter()
	a.router.Use(middleware.Logger)
	a.errCh = make(chan error)

	go func() {
		a.errCh <- http.ListenAndServe(":8080", a.router)
	}()

	select {
		case err := <-a.errCh:
			panic(err)
		case err := <- a.ctx.Done():
			close(a.errCh)
			fmt.Printf("Server closed: %b", err)
	}
}

func NewApp(ctx context.Context) *App {
	return &App{
		ctx: ctx,
	}
}
