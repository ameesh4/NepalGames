package main

import (
	"gamesNepal/server/src/services"
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
	router.Use(CORSMiddleware())
	router.Use(CheckToken())
	router.GET("/api/", hello)
	router.POST("/api/signup", services.RegisterUser)
	router.POST("/api/login", services.LoginUser)
	router.POST("/api/admin/login", services.AdminLogin)
	router.POST("/api/getuser", services.GetUser)
	router.POST("/api/edituser", services.EditUser)
	router.POST("/api/admin/getcategories", services.GetCategories)
	router.POST("/api/admin/deletecategory", services.DeleteCategory)
	router.POST("/api/admin/addcategory", services.AddCategory)
	router.POST("/api/admin/getusers", services.GetAllUsers)
	router.POST("/api/admin/deleteuser", services.DeleteUser)
	router.POST("/api/admin/searchuser", services.SearchUser)
	router.POST("/api/admin/addproduct", services.AddProduct)
	router.POST("/api/admin/editproduct", services.EditProduct)
	router.POST("/api/admin/getproducts", services.GetProducts)
	router.POST("/api/admin/deleteproduct", services.DeleteProduct)
	router.POST("/api/admin/searchproduct", services.SearchProduct)
	router.Run(":8000")
}
