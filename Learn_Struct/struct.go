package main

import (
	"errors"
	"fmt"
	"time"
)

type user struct {
	firstName string
	lastName  string
	birthdate string
	createdAt time.Time
}

func (u user) OutputUserData() { //  This (u user) is a method receiver, which allows us to call this function on any variable of type user.
	// (*u).firstName, (*u).lastName, (*u).birthdate    // This is deferancing the pointer to get the value, but Go allows us to skip that step and just use u.firstName, etc.
	fmt.Println(u.firstName, "|", u.lastName, "|", u.birthdate)
}

func (u *user) clearUserName() {
	u.firstName = ""
	u.lastName = ""
	// This will not change the original user variable that we call this method on, because in Go, when you pass a struct to
}

//constructor Function

func newUser(firstName, lastName, birthdate string) (*user, error) {
	if firstName == "" || lastName == "" || birthdate == "" {
		return nil, errors.New("invalid user data")
	}
	return &user{
		firstName: firstName,
		lastName:  lastName,
		birthdate: birthdate,
		createdAt: time.Now(),
	}, nil
}

func main() {
	firstName := getUserData("Please enter your first name: ")
	lastName := getUserData("Please enter your last name: ")
	birthdate := getUserData("Please enter your birthdate (MM/DD/YYYY): ")

	var appUser *user
	appUser, err := newUser(firstName, lastName, birthdate)
	if err != nil {
		fmt.Println(err)
		return
	}
	// ... do something awesome with that gathered data!
	appUser.OutputUserData()
	appUser.clearUserName()
	appUser.OutputUserData()
}

func getUserData(promptText string) string {
	fmt.Print(promptText)
	var value string
	fmt.Scanln(&value)
	return value
}
