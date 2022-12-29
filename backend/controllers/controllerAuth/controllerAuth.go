package controllerAuth

import (
	"encoding/json"
	"github.com/golang-jwt/jwt/v4"
	"local.app/serviceAuth"
	"net/http"
	"time"
)

var jwtKey = []byte("my_secret_key")

// Получать из базы данных
var users = map[string]string{
	"kopbox@gmail.com":  "181089kpp",
	"pkp-plp@yandex.ru": "181089kpp",
}

type Credentials struct {
	Password string `json:"password"`
	Email    string `json:"email"`
}

type Claims struct {
	Email string `json:"email"`
	Token string `json:"token"`
	jwt.RegisteredClaims
}

// Login Авторизация
func Login(w http.ResponseWriter, r *http.Request) {
	serviceAuth.Test()
	var credentials Credentials
	// Получаем тело JSON и декодируем в учетные данные
	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		// Если структура тела неверна, возвращаем ошибку HTTP
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Получаем пароль пользователя
	expectedPassword, ok := users[credentials.Email]

	// Если пароль не совпадает с полученным паролем, возвращаем статус "Неавторизованный"
	if !ok || expectedPassword != credentials.Password {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Устанавливаем время жизни токена 5 минут
	expirationTime := time.Now().Add(5 * time.Minute)
	// Создаем объект JWT, который включает имя пользователя и время истечения срока действия
	claims := &Claims{
		Email: credentials.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			// В JWT время истечения срока действия в unix миллисекундах
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	// Объявляем токен с алгоритмом, используемым для подписи
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Создаем JWT токен
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		// Если при создании JWT возникает ошибка, возвращается внутренняя ошибка сервера
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Устанавливаем клиентский файл cookie для «токена» в качестве JWT, который мы только что создали.
	// Устанавливаем время истечения срока действия, такое же, как и у самого токена.
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})

	res, err := json.Marshal(&Claims{
		Email: credentials.Email,
		Token: tokenString,
	})
	_, err = w.Write(res)
	if err != nil {
		return
	}
}

func Me(w http.ResponseWriter, r *http.Request) {
	if r.Header["Authorization"] == nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Получаем токен из заголовков
	tokenString := r.Header["Authorization"][0]
	claims := &Claims{}
	// Проверяем подпись JWT
	tkn, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	res, err := json.Marshal(&Claims{
		Email: claims.Email,
		Token: tokenString,
	})
	_, err = w.Write(res)
	if err != nil {
		return
	}
	return
}
