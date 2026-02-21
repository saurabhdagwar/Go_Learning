package main

import (
	"fmt"
	"math"
)

const inflationRate = 2.5

func main() {
	invesmentAmount := outputText("Enter Invesment Value: ")
	years := outputText("Enter Year: ")
	expectedReturnRate := outputText("Enter Expected Return Rate:")

	futureValue, futureRealValue := calcFutureValue(invesmentAmount, expectedReturnRate, years)

	formattedFV := fmt.Sprintf("Future Value: %.2f\n", futureValue)
	formattedRFV := fmt.Sprintf("Future Real value: %.2f", futureRealValue)
	fmt.Print(formattedFV, formattedRFV)
}

func outputText(text string) (num float64) {
	fmt.Print(text)
	fmt.Scan(&num)
	return num
}

func calcFutureValue(invesmentAmount, expectedReturnRate, years float64) (fv float64, rfv float64) {
	fv = invesmentAmount * math.Pow(1+expectedReturnRate/100, years)
	rfv = fv / math.Pow(1+inflationRate/100, years)
	return fv, rfv
}
