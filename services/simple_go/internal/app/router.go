package app

import (
	"django_kubes/simple_go/internal/app/middlewares"
	"django_kubes/simple_go/internal/routes"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func (a *App) loadRoutes() {
	a.router = chi.NewRouter()

	a.router.Use(middleware.RequestID)
	a.router.Use(middleware.RealIP)
	a.router.Use(middlewares.Cors)
	a.router.Use(middlewares.Authorization)
	a.router.Use(middleware.AllowContentType("application/json"))
	a.router.Use(middleware.Throttle(1000))
	a.router.Use(middleware.Logger)
	a.router.Use(middleware.Recoverer)
	a.router.Use(middlewares.JsonHeartbeat("/health"))
	a.router.Use(middleware.Timeout(60 * time.Second))
	
	a.router.Route("/todos", a.loadBaseRoutes)
}

func (a *App) loadBaseRoutes(router chi.Router) {
	baseHandlers := &routes.ApiRoutes{}

	baseHandlers.SetContext(a.ctx)
	baseHandlers.SetApp(a)

	router.Use(middlewares.TodoMiddleware)

	router.Get("/", baseHandlers.GetPosts)
	router.Get("/{id}", baseHandlers.GetPost)
}
