package src

import (
	"mime/multipart"
	"time"
)

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Age      int    `json:"age"`
}

type UserId struct {
	UserId int `json:"userId"`
}

type UserLogin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserUpdate struct {
	Email string `json:"email"`
	Name  string `json:"name"`
	Age   int    `json:"age"`
}

type UserResponse struct {
	UserID int    `json:"userId"`
	Email  string `json:"email"`
	Name   string `json:"name"`
	Age    int    `json:"age"`
}

type UserDB struct {
	UserId    int       `json:"userId"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	Name      string    `json:"name"`
	Age       int       `json:"age"`
	CreatedOn time.Time `json:"createdOn"`
	UpdatedOn time.Time `json:"updatedOn"`
}

type ProductDB struct {
	ProductId   int       `json:"productId"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Price       float64   `json:"price"`
	Quantity    int       `json:"quantity"`
	Picture     string    `json:"picture"`
	CategoryId  int       `json:"category"`
	CreatedOn   time.Time `json:"createdOn"`
	UpdatedOn   time.Time `json:"updatedOn"`
}

type Product struct {
	Name        string         `json:"name"`
	Description string         `json:"description"`
	Price       float64        `json:"price"`
	Quantity    int            `json:"quantity"`
	Picture     multipart.File `json:"picture"`
	CategoryId  int            `json:"category"`
}

type ProductRes struct {
	ProductId   int     `json:"productId"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Quantity    int     `json:"quantity"`
	Picture     string  `json:"picture"`
	CategoryId  int     `json:"category"`
}

type ProductId struct {
	ProductId int `json:"productId"`
}

type Category struct {
	Name string `json:"name"`
}

type CategoryDB struct {
	CategoryId int    `json:"categoryId"`
	Name       string `json:"name"`
	CreatedOn  string `json:"createdOn"`
	UpdatedOn  string `json:"updatedOn"`
}

type CategoryRes struct {
	CategoryId int    `json:"categoryId"`
	Name       string `json:"name"`
}

type Query struct {
	Query string `json:"query"`
}
