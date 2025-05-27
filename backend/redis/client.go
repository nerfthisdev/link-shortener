package redis

import (
	"context"
	"errors"
	"os"

	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()
var rdb *redis.Client

func Init() {
	addr := os.Getenv("REDIS_ADDR")
	if addr == "" {
		addr = "localhost:6379"
	}
	rdb = redis.NewClient(&redis.Options{
		Addr: addr,
		DB:   0,
	})
}

func Save(code string, url string) {
	rdb.Set(ctx, code, url, 0)
}

func Get(code string) (string, error) {
	val, err := rdb.Get(ctx, code).Result()
	if err == redis.Nil {
		return "", errors.New("not found")
	}
	return val, err
}

func Exists(code string) bool {
	count, _ := rdb.Exists(ctx, code).Result()
	return count > 0
}
