## Commands

```Shell

# 1. Install plugins
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# 2. Add directory to path
export PATH="$PATH:$(go env GOPATH)/bin"

# 3. Verify
which protoc-gen-go
which protoc-gen-go-grpc
```

```Shell

protoc --go_out=./inseeproto --go_opt=paths=source_relative --go-grpc_out=./inseeproto --go-grpc_opt=paths=source_relative insee.proto
```
