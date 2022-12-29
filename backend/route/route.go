package route

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	"local.app/controllerAuth"
	"log"
	"net/http"
	"time"
)

const ip string = ""

//const ip string = "172.31.254.5"
const port string = "5000"
const timing = 3

func Run() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", home)
	mux.HandleFunc("/api/me", controllerAuth.Me)
	mux.HandleFunc("/api/login", controllerAuth.Login)
	mux.HandleFunc("/ws", ws)
	handler := cors.Default().Handler(mux)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedHeaders:   []string{"*"},
		AllowedMethods:   []string{"GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE"},
		AllowCredentials: true,
		Debug:            false,
	})
	handler = c.Handler(handler)
	log.Fatal(http.ListenAndServe(fmt.Sprintf("%s:%s", ip, port), handler))
}

func home(w http.ResponseWriter, r *http.Request) {
	res, err := json.Marshal("HOME PAGE")
	_, err = w.Write(res)
	if err != nil {
		return
	}
}

// SOCKET
var upgrade = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func wsState(conn *websocket.Conn) {
	show := true
	for show {
		time.Sleep(timing * time.Second)
		res, err := json.Marshal("WS STREAM")
		if err != nil {
			return
		}
		if err := conn.WriteMessage(1, res); err != nil {
			show = false
			return
		}
	}
}

func wsReader(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			return
		}
		log.Println(string(p))
		if err := conn.WriteMessage(messageType, p); err != nil {
			return
		}
	}
}

func ws(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrade.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	go wsState(ws)
	wsReader(ws)
}
