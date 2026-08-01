package routes

import "django_kubes/simple_go/internal/models"

type RouteErrors struct{}

func (r *RouteErrors) SendErrorMessage(err ...error) {

}

func NewErrorHandler() models.ErrorInterface {
	return &RouteErrors{}
}
