package main

import (
	"gamesNepal/server/src/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

func CheckToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		excludedRoutes := []string{"/api/signup", "/api/login", "/api/admin/login"}

		for _, path := range excludedRoutes {
			if c.Request.URL.Path == path {
				c.Next()
				return
			}
		}

		token := c.GetHeader(("Authorization"))
		if token == "" {
			c.JSON(401, gin.H{
				"error": "Unauthorized",
			})
			c.Abort()
			return
		}

		_, err := services.CheckJWT(token)
		if err != nil {
			c.JSON(401, gin.H{
				"message": "Unauthorized",
				"error":   err.Error(),
			})
			c.Abort()
			return
		}

		c.Next()
	}
}
