package internal

import (
	"context"

	"github.com/modelcontextprotocol/go-sdk/mcp"
)

type FunctionSchema struct {
	A int `json:"a,omitempty"`
	B int `json:"b,omitempty"`
}

type RequestResponse struct {
	Result int `json:"result,omitempty"`
}

type CalculatorTools struct {
	app *App
}

func (s *CalculatorTools) Add(ctx context.Context, request *mcp.CallToolRequest, inputIn *FunctionSchema) (result *mcp.CallToolResult, output *RequestResponse, err error) {
	output = &RequestResponse{
		Result: inputIn.A + inputIn.B,
	}
	
	result = &mcp.CallToolResult{
		StructuredContent: output,
	}

	return result, output, nil
}
