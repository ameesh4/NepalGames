package services

import (
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) string {
	hashPass, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "Failed to hash Password"
	}
	return string(hashPass)
}

func MatchPassword(hashedPassword string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return false
	}
	return true
}
