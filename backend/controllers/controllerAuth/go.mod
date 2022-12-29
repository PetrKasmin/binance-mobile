module local.app/controllerAuth

go 1.18

require local.app/serviceAuth v0.0.0

require github.com/golang-jwt/jwt/v4 v4.4.3

replace local.app/serviceAuth => ../../services/serviceAuth
