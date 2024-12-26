package dao

import (
	"context"
	"gamesNepal/server/src"
	"time"
)

func CreateUser(user src.User) (string, error) {
	pool, err := src.DbConnect()
	if err != nil {
		return FailedToConnect, err
	}

	now := time.Now()
	createdOn := now.Format("2006-01-02")

	query := "INSERT INTO users (email, password, name, age, created_on, updated_on) VALUES ($1, $2, $3, $4, $5, $6)"
	_, err = pool.Exec(context.Background(), query, user.Email, user.Password, user.Name, user.Age, createdOn, createdOn)
	if err != nil {
		println(err.Error())
		if err.Error() == "ERROR: duplicate key value violates unique constraint \"users_email_key\" (SQLSTATE 23505)" {
			return "User already exists", err
		} else {
			return "Failed to create user", err
		}
	}

	return "User created", nil
}

func FindUser(user src.UserLogin) (src.UserDB, error) {
	println("Finding user")
	var userDB src.UserDB
	pool, err := src.DbConnect()
	if err != nil {
		return userDB, err
	}

	query := "SELECT * FROM users WHERE email = $1"
	err = pool.QueryRow(context.Background(), query, user.Email).Scan(&userDB.UserId, &userDB.Name, &userDB.Email, &userDB.Password, &userDB.CreatedOn, &userDB.UpdatedOn, &userDB.Age)

	if err != nil {
		return userDB, err
	}

	return userDB, nil
}

func FindUserById(userId int) (src.UserDB, error) {
	var userDB src.UserDB
	pool, err := src.DbConnect()
	if err != nil {
		return userDB, err
	}

	query := "SELECT * FROM users WHERE user_id = $1"
	err = pool.QueryRow(context.Background(), query, userId).Scan(&userDB.UserId, &userDB.Name, &userDB.Email, &userDB.Password, &userDB.CreatedOn, &userDB.UpdatedOn, &userDB.Age)

	if err != nil {
		return userDB, err
	}

	return userDB, nil
}

func EditUser(user src.UserUpdate) (string, error) {
	pool, err := src.DbConnect()
	if err != nil {
		return FailedToConnect, err
	}

	now := time.Now()
	updatedOn := now.Format("2006-01-02")

	query := "UPDATE users SET name = $1, age = $2, updated_on = $3 WHERE email = $4"
	_, err = pool.Exec(context.Background(), query, user.Name, user.Age, updatedOn, user.Email)
	if err != nil {
		return "Failed to update user", err
	}

	return "User updated", nil
}

func DeleteUser(id int) (string, error) {
	pool, err := src.DbConnect()
	if err != nil {
		return FailedToConnect, err
	}

	query := "DELETE FROM users WHERE user_id = $1"
	_, err = pool.Exec(context.Background(), query, id)
	if err != nil {
		return "Failed to delete user", err
	}

	return "User deleted", nil
}

func GetUsers() ([]src.UserResponse, error) {
	pool, err := src.DbConnect()
	if err != nil {
		return nil, err
	}

	query := "SELECT * FROM users"
	rows, err := pool.Query(context.Background(), query)
	if err != nil {
		return nil, err
	}

	var users []src.UserResponse
	for rows.Next() {
		var user src.UserDB
		err = rows.Scan(&user.UserId, &user.Name, &user.Email, &user.Password, &user.CreatedOn, &user.UpdatedOn, &user.Age)
		if err != nil {
			return nil, err
		}
		var userRes src.UserResponse
		userRes.UserID = user.UserId
		userRes.Email = user.Email
		userRes.Name = user.Name
		userRes.Age = user.Age
		users = append(users, userRes)
	}

	return users, nil
}

func SearchUser(query string) ([]src.UserResponse, error) {
	pool, err := src.DbConnect()
	if err != nil {
		return nil, err
	}

	query = "%" + query + "%"
	qry := "SELECT * FROM users WHERE email LIKE $1"
	rows, err := pool.Query(context.Background(), qry, query)
	if err != nil {
		return nil, err
	}

	var users []src.UserResponse
	for rows.Next() {
		var user src.UserDB
		err = rows.Scan(&user.UserId, &user.Name, &user.Email, &user.Password, &user.CreatedOn, &user.UpdatedOn, &user.Age)
		if err != nil {
			return nil, err
		}
		var userRes src.UserResponse
		userRes.UserID = user.UserId
		userRes.Email = user.Email
		userRes.Name = user.Name
		userRes.Age = user.Age
		users = append(users, userRes)
	}

	return users, nil
}
