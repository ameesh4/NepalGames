package services

import (
	"gamesNepal/server/src"
	"gamesNepal/server/src/dao"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddProduct(c *gin.Context) {
	var product src.Product
	c.BindJSON(&product)
	if product.Name == "" || product.Description == "" || len(product.PriceList) == 0 || product.Quantity == 0 || product.Picture == nil || product.Category == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid product details",
		})
		return
	}

	msg, err := dao.AddProduct(&product)
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

func EditProduct(c *gin.Context) {
	var product src.ProductDB
	c.BindJSON(&product)
	if product.ProductId == 0 || product.Name == "" || product.Description == "" || len(product.PriceList) == 0 || product.Quantity == 0 || product.Picture == "" || product.Category == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid product details",
		})
		return
	}

	msg, err := dao.EditProduct(&product)
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

func GetProducts(c *gin.Context) {
	products, err := dao.GetProducts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to get products",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":  "Products found",
		"products": products,
	})
}

func DeleteProduct(c *gin.Context) {
	var productId src.ProductId
	c.BindJSON(&productId)
	if productId.ProductId == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid product id",
		})
		return
	}

	msg, err := dao.DeleteProduct(productId.ProductId)
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

func SearchProduct(c *gin.Context) {
	var query src.Query
	c.BindJSON(&query)
	if query.Query == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid search query",
		})
		return
	}

	products, err := dao.SearchProduct(query.Query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to search product",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":  "Products found",
		"products": products,
	})
}
