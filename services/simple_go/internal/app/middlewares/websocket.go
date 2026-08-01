package middlewares

import (
	"django_kubes/simple_go/internal/utils"
	"net/http"

	"github.com/gorilla/websocket"
)

var CustomRequestUpgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(request *http.Request) bool {
		origin := request.Header.Get("Origin")

		_, ok := utils.AllowedOrigins[origin]
		if !ok {
			return false
		}

		return utils.AllowedOrigins[origin]
	},
}
