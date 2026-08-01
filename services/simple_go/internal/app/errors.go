package app

import "django_kubes/simple_go/internal/models"

type AppErrors struct {}

func (a *AppErrors) SendErrorMessage(err ...error) {

}

func NewErrorHandler() models.ErrorInterface {
	return &AppErrors{}
}
