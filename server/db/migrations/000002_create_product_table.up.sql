-- type ProductDB struct {
-- 	ProductId   int       `json:"productId"`
-- 	Name        string    `json:"name"`
-- 	Description string    `json:"description"`
-- 	Price       float64   `json:"price"`
-- 	Quantity    int       `json:"quantity"`
-- 	Picture     string    `json:"picture"`
-- 	Category    string    `json:"category"`
-- 	CreatedOn   time.Time `json:"createdOn"`
-- 	UpdatedOn   time.Time `json:"updatedOn"`
-- }

CREATE Table products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    price FLOAT,
    quantity INT,
    picture VARCHAR(255),
    category VARCHAR(255),
    created_on DATE,
    updated_on DATE
)
