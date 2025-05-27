package api

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/nerfthisdev-itmo/link-shortener/redis"
	"github.com/nerfthisdev-itmo/link-shortener/utils"
)

type ShortenRequest struct {
	URL string `json:"url"`
}

func ShortenHandler(w http.ResponseWriter, r *http.Request) {
	var req ShortenRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	code := utils.GenerateCode()

	for redis.Exists(code) {
		code = utils.GenerateCode()
	}

	redis.Save(code, req.URL)

	json.NewEncoder(w).Encode(map[string]string{
		"short_url": "http://localhost:8080/" + code,
	})
}

func RedirectHandler(w http.ResponseWriter, r *http.Request) {
	code := strings.TrimPrefix(r.URL.Path, "/")
	url, err := redis.Get(code)
	if err != nil {
		http.NotFound(w, r)
		return
	}
	http.Redirect(w, r, url, http.StatusFound)
}
