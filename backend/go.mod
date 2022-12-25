module main

go 1.18

require local.app/route v0.0.0

require local.app/auth v0.0.0 // indirect

require (
	github.com/golang-jwt/jwt v3.2.2+incompatible // indirect
	github.com/golang-jwt/jwt/v4 v4.4.3 // indirect
	github.com/gorilla/websocket v1.5.0 // indirect
	github.com/rs/cors v1.8.2 // indirect
)

replace local.app/route => ./route

replace local.app/auth => ./controllers/auth
