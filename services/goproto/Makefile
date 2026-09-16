install_proto_tools:
	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

build_proto:
	protoc --go_out=./loginproto --go_opt=paths=source_relative --go-grpc_out=./loginproto --go-grpc_opt=paths=source_relative login.proto
