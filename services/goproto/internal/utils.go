package internal

import (
	"context"

	pb "github.com/Zadigo/goproto/inseeproto"
)

type Server struct {
	pb.UnimplementedInseeServiceServer
}

func (s *Server) Siren(ctx context.Context, req *pb.SirenRequest) (*pb.SirenResponse, error) {
	items := []*pb.Business{
		{
			Name: "Leclerc",
			City: "Lille",
		},
		{
			Name: "Carrefour",
			City: "Lille",
		},
	}

	return &pb.SirenResponse{
		Items: items,
	}, nil
}

func (s *Server) Siret(ctx context.Context, req *pb.SiretRequest) (*pb.SiretResponse, error) {
	items := []*pb.Business{
		{
			Name: "Banque Populaire",
			City: "Paris",
		},
		{
			Name: "Crédit Agricole",
			City: "Marseille",
		},
	}

	return &pb.SiretResponse{
		Items: items,
	}, nil
}
