package dao

import (
	"context"
	"gamesNepal/server/src"
	"time"
)

var FailedToConnect = "Failed to connect to database"

func AddProduct(product *src.Product) (string, error) {
	pool, err := src.DbConnect()
	if err != nil {
		print(err)
		return FailedToConnect, err
	}

	now := time.Now()
	createdOn := now.Format("2006-01-02")

	query := "INSERT INTO products (name, description, price, quantity, picture, category, created_on, updated_on, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"

	_, err = pool.Exec(context.Background(), query, product.Name, product.Description, product.PriceList, product.Quantity, product.Picture, product.Category, createdOn, createdOn, product.Types)

	if err != nil {
		return "Failed to add product", err
	}

	return "Product added", nil
}

func GetProducts() ([]src.ProductRes, error) {
	pool, err := src.DbConnect()
	if err != nil {
		return nil, err
	}

	query := "SELECT * FROM products"
	rows, err := pool.Query(context.Background(), query)
	if err != nil {
		return nil, err
	}

	var products []src.ProductRes
	for rows.Next() {
		var productRes src.ProductRes
		var product src.ProductDB
		err = rows.Scan(&product.ProductId, &product.Name, &product.Description, &product.PriceList, &product.Quantity, &product.Picture, &product.Category, &product.CreatedOn, &product.UpdatedOn, &product.Types)
		if err != nil {
			return nil, err
		}
		productRes.ProductId = product.ProductId
		productRes.Name = product.Name
		productRes.Description = product.Description
		productRes.Price = product.PriceList
		productRes.Quantity = product.Quantity
		productRes.Picture = product.Picture
		productRes.Category = product.Category
		productRes.Types = product.Types

		products = append(products, productRes)
	}

	return products, nil
}

func DeleteProduct(productId int) (string, error) {
	pool, err := src.DbConnect()
	if err != nil {
		return FailedToConnect, err
	}

	query := "DELETE FROM products WHERE product_id = $1"
	_, err = pool.Exec(context.Background(), query, productId)
	if err != nil {
		return "Failed to delete product", err
	}

	return "Product deleted", nil
}

func EditProduct(product *src.ProductDB) (string, error) {
	pool, err := src.DbConnect()
	if err != nil {
		return FailedToConnect, err
	}

	now := time.Now()
	updatedOn := now.Format("2006-01-02")

	query := "UPDATE products SET name = $1, description = $2, price = $3, quantity = $4, picture = $5, category = $6, updated_on = $7, type = $8 WHERE product_id = $8"
	_, err = pool.Exec(context.Background(), query, product.Name, product.Description, product.PriceList, product.Quantity, product.Picture, product.Category, updatedOn, product.Types, product.ProductId)
	if err != nil {
		return "Failed to update product", err
	}

	return "Product updated", nil
}

func SearchProduct(query string) ([]src.ProductRes, error) {
	pool, err := src.DbConnect()
	if err != nil {
		return nil, err
	}

	query = "SELECT * FROM products WHERE name LIKE '%" + query + "%' OR description LIKE '%" + query + "%' OR category LIKE '%" + query + "%'"
	rows, err := pool.Query(context.Background(), query)
	if err != nil {
		return nil, err
	}

	var products []src.ProductRes
	for rows.Next() {
		var productRes src.ProductRes
		var product src.ProductDB
		err = rows.Scan(&product.ProductId, &product.Name, &product.Description, &product.PriceList, &product.Quantity, &product.Picture, &product.Category, &product.CreatedOn, &product.UpdatedOn, &product.Types)

		if err != nil {
			return nil, err
		}

		productRes.ProductId = product.ProductId
		productRes.Name = product.Name
		productRes.Description = product.Description
		productRes.Price = product.PriceList
		productRes.Quantity = product.Quantity
		productRes.Picture = product.Picture
		productRes.Category = product.Category
		productRes.Types = product.Types

		products = append(products, productRes)
	}

	return products, nil
}
