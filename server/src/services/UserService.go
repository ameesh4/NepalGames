package services

import (
	"gamesNepal/server/src"
	"gamesNepal/server/src/dao"
	"net/http"

	"github.com/gin-gonic/gin"
)

var InvalidCredentials = "Invalid credentials"

func RegisterUser(c *gin.Context) {
	var user src.User
	err := c.BindJSON(&user)
	if err != nil {
		println(err.Error())
		return
	}

	if user.Email == "" || user.Password == "" || user.Name == "" || user.Age == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": InvalidCredentials,
		})
		return
	}

	user.Password = HashPassword(user.Password)
	_, err = dao.CreateUser(user)

	if err != nil {
		println(err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User created",
	})
}

func LoginUser(c *gin.Context) {
	var user src.UserLogin

	err := c.BindJSON(&user)
	if err != nil {
		println(err.Error())
		return
	}

	if user.Email == "" || user.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": InvalidCredentials,
		})
		return
	}

	res, err := dao.FindUser(user)

	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Server error",
		})
		return
	}

	if !MatchPassword(res.Password, user.Password) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": InvalidCredentials,
		})
		return
	}

	token, err := SignJWT(&res.UserId)

	if err != nil {
		println(err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User found",
		"token":   token,
	})
}

func GetUser(c *gin.Context) {
	token := c.GetHeader("Authorization")
	userId, err := CheckJWT(token)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid token",
		})
		return
	}

	res, err := dao.FindUserById(userId)
	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "User not found",
		})
		return
	}

	var userRes src.UserResponse
	userRes.UserID = res.UserId
	userRes.Email = res.Email
	userRes.Name = res.Name
	userRes.Age = res.Age

	c.JSON(http.StatusOK, gin.H{
		"message": "User found",
		"user":    userRes,
	})
}

func EditUser(c *gin.Context) {
	var user src.User
	err := c.BindJSON(&user)
	if err != nil {
		println(err.Error())
		return
	}

	if user.Email == "" || user.Name == "" || user.Age == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid input",
		})
		return
	}

	_, err = dao.EditUser(user)

	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to update user",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User updated",
	})
}

func GetAllUsers(c *gin.Context) {
	users, err := dao.GetUsers()
	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to get users",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Users found",
		"users":   users,
	})
}

func DeleteUser(c *gin.Context) {
	var id src.UserId
	err := c.BindJSON(&id)
	if err != nil {
		println(err.Error())
		return
	}

	_, err = dao.DeleteUser(id.UserId)
	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to delete user",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User deleted",
	})
}

func SearchUser(c *gin.Context) {
	var query src.Query
	err := c.BindJSON(&query)
	if err != nil {
		println(err.Error())
		return
	}

	users, err := dao.SearchUser(query.Query)
	if err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to search user",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Users found",
		"users":   users,
	})
}
