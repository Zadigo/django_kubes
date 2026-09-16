package main

import (
	"context"

	"github.com/Zadigo/goproto/internal"
)

func main() {
	ctx := context.Background()
	instance := internal.NewApp(ctx)
	instance.Start()
}
