package auth

import (
	"encoding/json"
	"github.com/golang-jwt/jwt/v4"
	"net/http"
	"time"
)

const sum string = "c9616b89818bab8891cb8509313777df2cbdef107b06582593cd47fca7205fd2ab0b7759fd349e4e"

//var sampleSecretKey = []byte("binfut")

// Create the JWT key used to create the signature
var jwtKey = []byte("my_secret_key")

var users = map[string]string{
	"kopbox@gmail.com":  "181089kpp",
	"pkp-plp@yandex.ru": "181089kpp",
}

// Create a struct to read the username and password from the request body
type Credentials struct {
	Password string `json:"password"`
	Email    string `json:"email"`
}

// Create a struct that will be encoded to a JWT.
// We add jwt.RegisteredClaims as an embedded type, to provide fields like expiry time
type Claims struct {
	Email string `json:"email"`
	Token string `json:"token"`
	jwt.RegisteredClaims
}

// Create the Signin handler
func Login(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	// Get the JSON body and decode into credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Get the expected password from our in memory map
	expectedPassword, ok := users[creds.Email]

	// If a password exists for the given user
	// AND, if it is the same as the password we received, the we can move ahead
	// if NOT, then we return an "Unauthorized" status
	if !ok || expectedPassword != creds.Password {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Declare the expiration time of the token
	// here, we have kept it as 5 minutes
	expirationTime := time.Now().Add(5 * time.Minute)
	// Create the JWT claims, which includes the username and expiry time
	claims := &Claims{
		Email: creds.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the JWT string
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		// If there is an error in creating the JWT return an internal server error
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Finally, we set the client cookie for "token" as the JWT we just generated
	// we also set an expiry time which is the same as the token itself
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})

	res, err := json.Marshal(&Claims{
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

	tokenString := r.Header["Authorization"][0]
	claims := &Claims{}
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

//
//func generateJWT() (string, error) {
//
//	token := jwt.New(jwt.SigningMethodHS256)
//	claims := token.Claims.(jwt.MapClaims)
//	claims["exp"] = time.Now().Add(10 * time.Hour)
//	claims["authorized"] = true
//	claims["user"] = "username"
//
//	tokenString, err := token.SignedString(sampleSecretKey)
//
//	if err != nil {
//		return "Signing Error", err
//	}
//
//	return tokenString, nil
//}
//
//// comment these
//func verifyJWT(endpointHandler func(writer http.ResponseWriter, request *http.Request)) http.HandlerFunc {
//	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
//		if request.Header["Authorization"] != nil {
//			token, err := jwt.Parse(request.Header["Authorization"][0], func(token *jwt.Token) (interface{}, error) {
//				_, ok := token.Method.(*jwt.SigningMethodECDSA)
//				if !ok {
//					writer.WriteHeader(http.StatusUnauthorized)
//					_, err := writer.Write([]byte("You're Unauthorized"))
//					if err != nil {
//						return nil, err
//					}
//				}
//				return "", nil
//
//			})
//
//			// parsing errors result
//			if err != nil {
//				writer.WriteHeader(http.StatusUnauthorized)
//				_, err2 := writer.Write([]byte("You're Unauthorized due to error parsing the JWT"))
//				if err2 != nil {
//					return
//				}
//
//			}
//			// if there's a token
//			if token.Valid {
//				endpointHandler(writer, request)
//			} else {
//				writer.WriteHeader(http.StatusUnauthorized)
//				_, err := writer.Write([]byte("You're Unauthorized due to invalid token"))
//				if err != nil {
//					return
//				}
//			}
//		} else {
//			writer.WriteHeader(http.StatusUnauthorized)
//			_, err := writer.Write([]byte("You're Unauthorized due to No token in the header"))
//			if err != nil {
//				return
//			}
//		}
//		// response for if there's no token header
//	})
//}
//
//func extractClaims(_ http.ResponseWriter, request *http.Request) (string, error) {
//	if request.Header["Authorization"] != nil {
//		tokenString := request.Header["Authorization"][0]
//		claims := jwt.MapClaims{}
//		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
//			return sampleSecretKey, nil
//		})
//
//		if err != nil {
//			return "Error Parsing Token: ", err
//		}
//
//		claims, ok := token.Claims.(jwt.MapClaims)
//		if ok && token.Valid {
//			username := claims["username"].(string)
//			return username, nil
//		}
//	}
//
//	return "unable to extract claims", nil
//}
//
//type Message struct {
//	Status string `json:"status"`
//	Info   string `json:"info"`
//}
//
//func handlePage(writer http.ResponseWriter, request *http.Request) {
//	_, err := generateJWT()
//	if err != nil {
//		log.Fatalln("Error generating JWT", err)
//	}
//
//	writer.Header().Set("Authorization", "%v")
//	type_ := "application/json"
//	writer.Header().Set("Content-Type", type_)
//	var message Message
//	err = json.NewDecoder(request.Body).Decode(&message)
//	if err != nil {
//		return
//	}
//	err = json.NewEncoder(writer).Encode(message)
//	if err != nil {
//		return
//	}
//}
//
//func authPage() {
//	token, _ := generateJWT()
//	client := &http.Client{}
//	req, _ := http.NewRequest("GET", "http://localhost:8080/", nil)
//	req.Header.Set("Authorization", token)
//	_, _ = client.Do(req)
//}
//
//func Login(w http.ResponseWriter, r *http.Request) {
//	dto := DTO{}
//	result := Response{}
//
//	err := json.NewDecoder(r.Body).Decode(&dto)
//	if err != nil {
//		http.Error(w, err.Error(), http.StatusBadRequest)
//		return
//	}
//
//	if check(&dto) {
//		result.Token, err = generateJWT()
//	}
//
//	res, err := json.Marshal(result)
//	_, err = w.Write(res)
//	if err != nil {
//		return
//	}
//}
//
//func Me(w http.ResponseWriter, r *http.Request) {
//	result := Response{}
//
//	claims, err := extractClaims(w, r)
//	if err != nil {
//		fmt.Println(err)
//		return
//	}
//
//	result.Token = claims
//	fmt.Println(claims)
//
//	fmt.Println("ME")
//	res, err := json.Marshal(result)
//	_, err = w.Write(res)
//	if err != nil {
//		return
//	}
//}
//
//type DTO struct {
//	Email    string `json:"email"`
//	Password string `json:"password"`
//}
//
//type Response struct {
//	Token string `json:"token"`
//}
//
//func hash(pass string) string {
//	h := sha1.New()
//	h.Write([]byte(pass))
//	return hex.EncodeToString(h.Sum(nil))
//}
//
//func check(dto *DTO) bool {
//	e := hash(dto.Email)
//	p := hash(dto.Password)
//	return sum == e+p
//}
