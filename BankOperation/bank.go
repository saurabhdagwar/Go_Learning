package main

import (
	"errors"
	"fmt"
	"os"
	"strconv"
)

const balanceFile = "balance.txt"

func readBalanceFromFile() (float64, error) {
	data, err := os.ReadFile(balanceFile)

	if err != nil {
		return 1000, errors.New("Failed to read File")
	}
	balanceText := string(data)
	balance, err := strconv.ParseFloat(balanceText, 64)

	if err != nil {
		return 1000, errors.New("Failed to parse read value")
	}
	return balance, nil
}

func writeBalanceToFile(balance float64) {
	balanceText := fmt.Sprint(balance)
	os.WriteFile(balanceFile, []byte(balanceText), 0644)
}

func main() {

	var accountBalance, err = readBalanceFromFile()

	if err != nil {
		fmt.Println("Error reading balance:", err)
		fmt.Println("-----------------")
		// panic("Can't continue Sorry!")
	}
	fmt.Println("Welcome to Bank!")

	for {
		fmt.Println("What do you want to do?")
		fmt.Println("1. Check Balance")
		fmt.Println("2. Deposit Money")
		fmt.Println("3. Withdraw Money")
		fmt.Println("4. Exit")

		var choice int
		fmt.Print("Enter Your Choice: ")
		fmt.Scan(&choice)

		switch choice {
		case 1:
			fmt.Println("Your Balance is : ", accountBalance)
		case 2:
			var depositAmount float64
			fmt.Print("Enter Deposit Amount : ")
			fmt.Scan(&depositAmount)
			if depositAmount <= 0 {
				fmt.Println("Invalid Deposit Amount")
				continue
			}

			accountBalance += depositAmount
			fmt.Println("Your Balance is : ", accountBalance)
			writeBalanceToFile(accountBalance)
		case 3:
			var withdrawAmount float64
			fmt.Print("Enter Withdraw Amount: ")
			fmt.Scan(&withdrawAmount)

			if withdrawAmount <= 0 {
				fmt.Println("Invalid Withdraw Amount")
				continue
			}
			if withdrawAmount > accountBalance {
				fmt.Println("Insufficient Balance")
			} else {
				accountBalance -= withdrawAmount
				fmt.Println("Your Balance is : ", accountBalance)
			}
			writeBalanceToFile(accountBalance)
		default:
			fmt.Print("Good Bye!")
			fmt.Println("Thank you for using Bank!")
			return
		}
	}

}
