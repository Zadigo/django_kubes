package ticker

import (
	"context"
	"django_kubes/simple_go/internal/backend"
	"django_kubes/simple_go/internal/models"
	"fmt"
	"time"

	"github.com/go-co-op/gocron"
	"github.com/redis/go-redis/v9"
)

type TickerApp struct {
	ctx         context.Context
	redisClient *redis.Client
	scheduler   *gocron.Scheduler
	timezone    *time.Location
	tickerErr   chan error
}

func (t *TickerApp) Start() error {
	t.scheduler = gocron.NewScheduler(t.timezone)

	go func() {
		_, err := t.scheduler.Every(1).Minute().Do(func() {
			t.tickerErr <- fmt.Errorf("Test error")
		})

		t.tickerErr <- err
		t.scheduler.StartBlocking()
	}()

	select {
	case err := <-t.tickerErr:
		return err
	case <-t.ctx.Done():
		t.scheduler.Stop()
		return t.ctx.Err()
	}
}

func (t *TickerApp) GetRedisClient() *redis.Client {
	return t.redisClient
}

func NewTickerApp(ctx context.Context) models.AppInterface {
	redisClient := backend.RedisClient()

	return &TickerApp{
		ctx:         ctx,
		redisClient: redisClient,
		scheduler:   nil,
		timezone:    time.UTC,
		tickerErr:   make(chan error),
	}
}
