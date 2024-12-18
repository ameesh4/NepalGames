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
	router.GET("/api/", hello)
	router.POST("/api/signup", components.Signup)
	router.Run(":8000")
}
