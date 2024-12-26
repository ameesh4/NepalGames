package dao

import (
	"context"
	"gamesNepal/server/src"
	"time"
)

func AddCategory(category *src.Category) (string, error) {
	pool, err := src.DbConnect()
	if err != nil {
		return "Failed to connect to db", err
	}

	now := time.Now()
	createdOn := now.Format("2006-01-02")

	query := "INSERT INTO categories (name, created_on, updated_on) VALUES ($1, $2, $3)"

	_, err = pool.Exec(context.Background(), query, category.Name, createdOn, createdOn)

	if err != nil {
		return "Failed to add category", err
	}

	return "Category added", nil
}

func GetCategories() ([]src.CategoryRes, error) {
	pool, err := src.DbConnect()
	if err != nil {
		return nil, err
	}

	query := "SELECT * FROM categories"
	rows, err := pool.Query(context.Background(), query)
	if err != nil {
		return nil, err
	}

	var categories []src.CategoryRes
	for rows.Next() {
		var categorydb src.CategoryDB
		var category src.CategoryRes
		err = rows.Scan(&categorydb.CategoryId, &categorydb.Name, &categorydb.CreatedOn, &categorydb.UpdatedOn)
		if err != nil {
			return nil, err
		}

		category.Name = categorydb.Name
		category.CategoryId = categorydb.CategoryId
		categories = append(categories, category)
	}

	return categories, nil
}

func DeleteCategory(name string) (string, error) {
	pool, err := src.DbConnect()
	if err != nil {
		return "Failed to connect to db", err
	}

	query := "DELETE FROM categories WHERE name = $1"
	_, err = pool.Exec(context.Background(), query, name)
	if err != nil {
		return "Failed to delete category", err
	}

	return "Category deleted", nil
}
