package main

import (
	"gamesNepal/server/src/components"
	"net/http"

	"github.com/gin-gonic/gin"
)

func hello(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Hello World",
	})
}

func main() {
	router := gin.Default()
	router.GET("/", hello)
	router.POST("/api/signup", components.Signup)
	router.Run("127.0.0.1:8000")
}
