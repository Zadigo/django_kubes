package app

import (
	"django_kubes/simple_go/internal/routes"

	"github.com/go-chi/chi"
)

func (a *App) loadRoutes() {
	a.router = chi.NewRouter()
	// a.router.Use()
	a.router.Route("/todos", a.loadBaseRoutes)
}

func (a *App) loadBaseRoutes(router chi.Router) {
	baseHandlers := &routes.ApiRoutes{}
	
	baseHandlers.SetContext(a.ctx)
	baseHandlers.SetApp(a)

	router.Get("/", baseHandlers.GetPosts)
	router.Get("/{id}", baseHandlers.GetPost)
}
