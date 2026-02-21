package main

import "fmt"

func main() {
	revenue := scanData("Revenue: ")
	expenses := scanData("Expenses: ")
	taxRate := scanData("Tax Rate: ")

	ebt, profit, ratio := calculateFinances(revenue, expenses, taxRate)
	fmt.Println("EBT:", ebt)
	fmt.Println("Profit:", profit)
	fmt.Println("Ratio:", ratio)

}

func calculateFinances(revenue, expenses, taxRate float64) (ebt, profit, ratio float64) {
	ebt = revenue - expenses
	profit = ebt * (1 - taxRate/100)
	ratio = ebt / profit
	return ebt, profit, ratio

}
func scanData(stq string) (data float64) {
	fmt.Print(stq)
	fmt.Scan(&data)
	return data
}
