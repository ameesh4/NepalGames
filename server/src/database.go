package src

import (
	"context"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func DbConnect() (*pgxpool.Pool, error) {
	// err := godotenv.Load()

	// if err != nil {
	// 	return nil, err
	// }

	conn := os.Getenv("DB_URL")

	pool, err := pgxpool.New(context.Background(), conn)
	if err != nil {
		return nil, err
	}

	return pool, nil
}
