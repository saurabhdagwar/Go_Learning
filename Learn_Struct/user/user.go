package user

import (
	"errors"
	"fmt"
	"time"
)

type User struct {
	firstName string
	lastName  string
	birthdate string
	createdAt time.Time
}

type Admin struct {
	email    string
	password string	
	User
}

func (u User) OutputData() { //  This (u User) is a method receiver, which allows us to call this function on any variable of type User.
	// (*u).firstName, (*u).lastName, (*u).birthdate    // This is deferancing the pointer to get the value, but Go allows us to skip that step and just use u.firstName, etc.
	fmt.Println(u.firstName, "|", u.lastName, "|", u.birthdate)
}

func (u *User) ClearName() {
	u.firstName = ""
	u.lastName = ""
	// This will not change the original user variable that we call this method on, because in Go, when you pass a struct to
}

// Struct Embedding

func NewAdmin(email, password string) Admin {
	return Admin{
		email:    email,
		password: password,
		user: User{
			firstName: "Admin",
			lastName: "Admin",
			birthdate: "01/01/1970",
			createdAt: time.Now(),
		}
	}
}

// constructor Function
func New(firstName, lastName, birthdate string) (*User, error) {
	if firstName == "" || lastName == "" || birthdate == "" {
		return nil, errors.New("invalid user data")
	}
	return &User{
		firstName: firstName,
		lastName:  lastName,
		birthdate: birthdate,
		createdAt: time.Now(),
	}, nil
}
