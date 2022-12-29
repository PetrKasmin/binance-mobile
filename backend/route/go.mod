module local.app/route

go 1.18

require local.app/controllerAuth v0.0.0
require local.app/serviceAuth v0.0.0

require (
	github.com/gorilla/websocket v1.5.0
	github.com/rs/cors v1.8.2
)

replace local.app/controllerAuth => ../controllers/controllerAuth
replace local.app/serviceAuth => ../services/serviceAuth
