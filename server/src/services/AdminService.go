package services

import (
	"gamesNepal/server/src"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func AdminLogin(c *gin.Context) {
	err := godotenv.Load()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	var admin src.UserLogin
	err = c.BindJSON(&admin)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	if admin.Email == "" || admin.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid input",
		})
		return
	}

	adminIDStr := os.Getenv("ADMIN_ID")
	id, err := strconv.Atoi(adminIDStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Invalid ADMIN_ID",
		})
		return
	}

	if admin.Email == os.Getenv("ADMIN_USERNAME") && admin.Password == os.Getenv("ADMIN_PASSWORD") {
		res, err := SignJWT(&id)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Admin logged in",
			"token":   res,
		})
		return
	}

	c.JSON(http.StatusUnauthorized, gin.H{
		"message": "Invalid credentials",
	})
}
