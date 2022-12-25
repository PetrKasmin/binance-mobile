module local.app/route

go 1.18

require local.app/auth v0.0.0

require (
	github.com/gorilla/websocket v1.5.0
	github.com/rs/cors v1.8.2
)

replace local.app/auth => ../controllers/auth
