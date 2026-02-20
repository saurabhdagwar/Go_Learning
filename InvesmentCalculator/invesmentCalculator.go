package main

import "fmt"

func main() {
	fmt.Println("Investment Calculator")
	var invesmentAmount = 1000
	var expectedReturnRate = 5.5
	var years = 10

	var futureValue = float64(invesmentAmount) * (1 + expectedReturnRate/100) * float64(years)
	fmt.Printf("Future Value of the Investment: %.2f\n", futureValue)
}
