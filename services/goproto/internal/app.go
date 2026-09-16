package internal

import (
	"context"
	"fmt"
	"log"
	"net"

	pb "github.com/Zadigo/goproto/inseeproto"
	"github.com/go-chi/chi/v5"
	"google.golang.org/grpc"
)

type App struct {
	ctx context.Context
	router *chi.Mux
	errCh chan error
}

func (a *App) Start() {
	fmt.Print("Starting server...")

	listener, err := net.Listen("tcp", ":9001")
	if err != nil {
		log.Fatalf("Could not start TCP server %b", err)
	}

	defer listener.Close()

	grpcServer := grpc.NewServer()
	pb.RegisterInseeServiceServer(grpcServer, &Server{})
	a.errCh <- grpcServer.Serve(listener)

	select {
	case err := <- a.errCh:
		fmt.Printf("Error running server %b", err)
	case err :=  <- a.ctx.Done():
		close(a.errCh)
		fmt.Printf("Closing server %s", err)
	}
}

func NewApp(ctx context.Context) *App {
	return &App{
		ctx: ctx,
	}
}
