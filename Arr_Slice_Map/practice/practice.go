package practice

import "fmt"

func Practice() {
	var productName [4]string = [4]string{"book", "math"} // First Way to define Array
	prices := [4]float64{10.99, 32.08, 20.0, 5.6}         // Another Way to define Array
	productName[2] = "table"                              // Assign Value to Array
	fmt.Println(prices[2])                                // Get perticuler element from an array with index
	fmt.Println(productName)
	featuredPrices := prices[1:3] // Array Slice from index 1 to 3 where 3index is excluded
	featuredPrices[0] = 35.10     // This will also update the original Array
	fmt.Println(featuredPrices)
	fmt.Println(prices)
	fmt.Println(len(prices)) // Length of Array (Number of items in an array)
	fmt.Println(cap(prices)) // Capacity of the items to store items
	// Dynamic Arrays using Slice
	pricesA := []float64{100.23, 23.97}
	fmt.Println(pricesA)
	pricesB := append(pricesA, 67.98)
	fmt.Println(pricesB)
	// With Make function
	userName := make([]string, 2)
	userName[0] = "Saurabh"
	userName = append(userName, "Max")
	fmt.Println(userName)
	// for loop for Slice
	for index, value := range prices {
		fmt.Println(index, value)
	}
}
