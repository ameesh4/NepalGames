package src

import (
	"context"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/kittipat1413/go-common/framework/cache/localcache"
)

func DbConnect() (*pgxpool.Pool, error) {
	err := godotenv.Load()

	if err != nil {
		return nil, err
	}
	ctx := context.Background()

	c := localcache.New[*pgxpool.Pool](
		localcache.WithDefaultExpiration(10 * time.Minute),
	)

	key := "db"

	initializer := func() (*pgxpool.Pool, *time.Duration, error) {
		conn := os.Getenv("DB_URL")
		pool, err := pgxpool.New(context.Background(), conn)
		if err != nil {
			return nil, nil, err
		}
		duration := 5 * time.Minute
		return pool, &duration, nil
	}

	data, err := c.Get(ctx, key, initializer)
	if err != nil {
		return nil, err
	}

	return data, nil
}
