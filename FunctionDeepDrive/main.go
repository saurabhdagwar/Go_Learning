package main

import (
	"fmt"

	anonomousfunc "github.com/saurabhdagwar/Go_Learning/tree/main/FunctionDeepDrive/anonomousFunc"
)

func main() {
	numbers := []int{1, 2, 3, 4, 5}
	fmt.Println("Double : ", transformFunc(&numbers, double))
	fmt.Println("Triple : ", transformFunc(&numbers, triple))
	anonomousfunc.AnonomousFunc()
}

func transformFunc(array *[]int, transform func(int) int) []int {
	dnumber := []int{}
	for _, val := range *array {
		dnumber = append(dnumber, transform(val))
	}
	return dnumber
}
func double(val int) int {
	return val * 2
}
func triple(val int) int {
	return val * 3
}
