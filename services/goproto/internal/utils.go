package internal

import (
	pb "github.com/Zadigo/goproto/inseeproto"
)

type server struct {
	pb.UnimplementedInseeServiceServer
}

func (s *server) Siren() {
	
}

func (s *server) Siret() {
	
}
