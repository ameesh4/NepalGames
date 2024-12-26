package services

import (
	"gamesNepal/server/src"
	"gamesNepal/server/src/dao"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddCategory(c *gin.Context) {
	var category src.Category
	c.BindJSON(&category)
	if category.Name == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid category details",
		})
		return
	}

	msg, err := dao.AddCategory(&category)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": msg,
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": msg,
	})
}

func GetCategories(c *gin.Context) {
	categories, err := dao.GetCategories()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to get categories",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"categories": categories,
	})
}

func DeleteCategory(c *gin.Context) {
	var category src.Category
	c.BindJSON(&category)
	msg, err := dao.DeleteCategory(category.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": msg,
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": msg,
	})
}
