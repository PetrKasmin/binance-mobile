module main

go 1.18

require server v0.0.0

require (
	github.com/gorilla/websocket v1.5.0 // indirect
	github.com/rs/cors v1.8.2 // indirect
)

replace server => ./server