package main

import (
	"log"
	"net/http"

	"github.com/nerfthisdev-itmo/link-shortener/api"
	"github.com/nerfthisdev-itmo/link-shortener/redis"
)

func main() {
	redis.Init()

	router := http.NewServeMux()
	router.HandleFunc("POST /shorten", api.ShortenHandler)
	router.HandleFunc("GET /", api.RedirectHandler)

	server := http.Server{
		Addr:    ":52345",
		Handler: router,
	}

	log.Println("Starting server on port " + server.Addr)
	server.ListenAndServe()
}
