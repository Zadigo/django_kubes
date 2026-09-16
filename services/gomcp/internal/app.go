package internal

import (
	"context"
	"fmt"

	"github.com/modelcontextprotocol/go-sdk/mcp"
)

type App struct {
	ctx context.Context
	errCh chan error
	server *mcp.Server
}

func (a *App) Start() {
	fmt.Print("Starting server...")

	a.server = mcp.NewServer(&mcp.Implementation{
		Name: "Calculator",
		Description: "A calculator to calculate simple values",
		Title: "MCP Calculator",
	}, &mcp.ServerOptions{
		Instructions: "You are a calculator",
	})

	calculatorTools := &CalculatorTools{app: a,}
	mcp.AddTool(
		a.server,
		&mcp.Tool{
			Name: "Addition", 
			Description: "Add two values together",
		}, 
		calculatorTools.Add,
	)

	go func() {
		a.errCh <- a.server.Run(a.ctx, &mcp.StdioTransport{})
	}()

	select {
	case err := <- a.errCh:
		fmt.Printf("Some error occured %v", err)
	case <- a.ctx.Done():
		fmt.Printf("Server stopped %s", a.ctx.Err().Error())
	}
}

func NewApp(ctx context.Context) *App {
	app := &App{ctx: ctx, errCh: make(chan error), server: nil}
	return app
}
