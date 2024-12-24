package services

import (
	"fmt"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

var secret_key = []byte(os.Getenv("SECRET_KEY"))

func SignJWT(userId *int) (string, error) {
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": userId,
	})

	token, err := claims.SignedString(secret_key)
	if err != nil {
		return "", err
	}

	return token, nil
}

func CheckJWT(tokenString string) (int, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method")
		}

		return secret_key, nil
	})

	if err != nil {
		return 0, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return int(claims["userId"].(float64)), nil
	}

	return 0, fmt.Errorf("invalid token")
}
