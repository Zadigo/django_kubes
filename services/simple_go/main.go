package main

import (
	"context"
	"django_kubes/simple_go/internal/app"
	"django_kubes/simple_go/internal/utils"
	"errors"
	"fmt"
	"os"
	"os/signal"

	"github.com/joho/godotenv"
)

// type ServerRegistry struct {
// 	clients map[string]*websocket.Conn
// 	mu      sync.Mutex
// }

// func (s *ServerRegistry) AddClient(conn *websocket.Conn) {
// 	s.mu.Lock()
// 	defer s.mu.Unlock()

// 	s.clients[uuid.NewString()] = conn
// 	log.Println("⚡️ New client connected. Total clients:", len(s.clients))
// }

// func (s *ServerRegistry) RemoveClient(conn *websocket.Conn) {
// 	s.mu.Lock()
// 	defer s.mu.Unlock()

// 	for id, c := range s.clients {
// 		if c == conn {
// 			delete(s.clients, id)
// 			break
// 		}
// 	}

// 	log.Println("⚡️ Client disconnected. Total clients:", len(s.clients))
// }

// func NewServerRegistry() *ServerRegistry {
// 	return &ServerRegistry{
// 		clients: make(map[string]*websocket.Conn),
// 	}
// }

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		panic("Error loading .env file")
	}

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()

	rootDir, err := utils.GetAbsolutePath(".")
	if err != nil {
		panic("Error while trying to get absolute directory")
	}

	ctx = context.WithValue(ctx, "rootDir", rootDir)

	httpApp := app.NewApp(ctx)
	err = httpApp.Start()
	if err != nil {
		panic(errors.Join(fmt.Errorf("An error occured"), err))
	}

	// log.Println("⚡️ Starting server on port 9000...")

	// router := chi.NewRouter()

	// router.Use(middleware.RequestID)
	// router.Use(middleware.RealIP)
	// router.Use(middleware.Logger)
	// router.Use(middleware.Recoverer)
	// router.Use(middleware.Timeout(60 * time.Second))
	// router.Use(middleware.Logger)

	// // Initialize Redis client
	// options, err := redis.ParseURL("redis://localhost:6379")
	// if err != nil {
	// 	panic(err)
	// }

	// // Create a server registry to manage WebSocket clients
	// serverRegistry := NewServerRegistry()

	// redisClient := redis.NewClient(options)
	// log.Println("✅ Connected to Redis")

	// // Start a Gocron job to publish messages to Redis every 5 seconds
	// scheduler := gocron.NewScheduler(time.UTC)
	// log.Println("⏰ Created new scheduler")

	// cmd := redisClient.Subscribe(context.Background(), "my_channel")
	// log.Println("✅ Subscribed to Redis channel")
	// channel := cmd.Channel()

	// go func() {
	// 	scheduler.Every(40).Seconds().Do(func() {
	// 		cmd := redisClient.Publish(context.Background(), "my_channel", "Hello from Go!")
	// 		if cmd.Err() != nil {
	// 			log.Println("❌ Failed to publish message:", cmd.Err())
	// 		}
	// 	})
	// 	scheduler.StartAsync()
	// }()

	// // Start a goroutine to listen for messages from Redis
	// // and broadcast them to WebSocket clients
	// broadcast := make(chan string)
	// go func() {
	// 	for msg := range channel {
	// 		broadcast <- msg.Payload
	// 	}
	// }()

	// go func() {
	// 	for {
	// 		select {
	// 		case message := <-broadcast:
	// 			for _, conn := range serverRegistry.clients {
	// 				err := conn.WriteJSON(map[string]string{"message": message})
	// 				if err != nil {
	// 					conn.Close()
	// 				}
	// 			}
	// 		}
	// 	}
	// }()

	// router.Get("/connect", internal.Cors(func(w http.ResponseWriter, r *http.Request) {
	// 	conn, err := internal.CustomRequestUpgrader.Upgrade(w, r, nil)
	// 	if err != nil {
	// 		http.Error(w, "Failed to upgrade connection", http.StatusInternalServerError)
	// 		return
	// 	}

	// 	defer func() {
	// 		serverRegistry.RemoveClient(conn)
	// 		conn.Close()
	// 	}()

	// 	conn.SetReadLimit(1024)
	// 	conn.SetReadDeadline(time.Now().Add(60 * time.Second))

	// 	conn.SetPongHandler(func(string) error {
	// 		conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	// 		return nil
	// 	})

	// 	serverRegistry.AddClient(conn)

	// 	for {
	// 		var message map[string]any
	// 		err := conn.ReadJSON(&message)

	// 		if err != nil {
	// 			if websocket.IsCloseError(err, websocket.CloseNormalClosure) {
	// 				return
	// 			}
	// 			http.Error(w, "Failed to read message", http.StatusInternalServerError)
	// 			return
	// 		}
	// 	}
	// }))

	// err = http.ListenAndServe(":9000", router)
	// if err != nil {
	// 	panic(err)
	// }
}
