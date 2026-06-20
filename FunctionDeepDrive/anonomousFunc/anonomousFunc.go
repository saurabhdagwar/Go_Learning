package anonomousfunc

import "fmt"

func AnonomousFunc() {
	numbers := []int{1, 2, 3, 4, 5}
	transform := transformFunc(&numbers, func(num int) int {
		return num * 2
	})
	fmt.Println(transform)
}

func transformFunc(array *[]int, transform func(int) int) []int {
	dnumber := []int{}
	for _, val := range *array {
		dnumber = append(dnumber, transform(val))
	}
	return dnumber
}
