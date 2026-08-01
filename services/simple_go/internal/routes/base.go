package routes

import (
	"net/http"
)

type ApiRoutes struct {
	BaseRoute
}

func (b *ApiRoutes) GetPosts(w http.ResponseWriter, r *http.Request) {

}

func (b *ApiRoutes) GetPost(w http.ResponseWriter, r *http.Request) {

}
