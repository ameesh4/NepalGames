package components

import (
	"gamesNepal/server/src"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Age      int    `json:"age"`
}

func Signup(c *gin.Context) {
	var user User
	err := c.BindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	if user.Email == "" || user.Password == "" || user.Name == "" || user.Age == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid input",
		})
		return
	}

	pool, err := src.DbConnect()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	user.Password = hashPassword(user.Password)
	now := time.Now()
	createdOn := now.Format("2006-01-02")

	query := "INSERT INTO users (email, password, name, age, created_on, updated_on) VALUES ($1, $2, $3, $4, $5, $6)"
	_, err = pool.Exec(c, query, user.Email, user.Password, user.Name, user.Age, createdOn, createdOn)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User created",
	})
}

func hashPassword(password string) string {
	hashPass, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "Failed to hash Password"
	}
	return string(hashPass)
}
