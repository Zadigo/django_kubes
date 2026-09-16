package main

import (
	"github.com/Zadigo/gomcp/internal"
)


func main() {
	// ctx := context.Background()
	// app := internal.NewApp(ctx)
	// app.Start()
	
	// internal.McpAlternative()
	internal.NewHTTPServerWithRoots()
}
