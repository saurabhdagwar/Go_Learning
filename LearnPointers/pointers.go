package main

import "fmt"

func main() {
	age := 32
	agePointer := &age
	fmt.Println("Age: ", *agePointer)
	getAdultAge(agePointer)
	// fmt.Println("Adult Age: ", adultAge)
	fmt.Println("Age: ", *agePointer)
}

func getAdultAge(age *int) {
	*age = *age - 18
}
