package redis

import (
	"context"
	"errors"

	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()
var rdb *redis.Client

func Init() {
	rdb = redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
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
