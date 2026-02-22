package main

import (
	"fmt"

	"github.com/Pallinder/go-randomdata"
	"github.com/saurabhdagwar/Go_Learning/tree/main/BankOperation/fileOperations"
)

const balanceFile = "balance.txt"

func main() {

	var accountBalance, err = fileOperations.GetFloatFromFile(balanceFile)

	if err != nil {
		fmt.Println("Error reading balance:", err)
		fmt.Println("-----------------")
		// panic("Can't continue Sorry!")
	}
	fmt.Println("Welcome to Bank!")
	fmt.Println("Reach us 24/7", randomdata.PhoneNumber())

	for {
		presentOptions()
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
			fileOperations.WriteFloatToFile(balanceFile, accountBalance)
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
			fileOperations.WriteFloatToFile(balanceFile, accountBalance)
		default:
			fmt.Print("Good Bye!")
			fmt.Println("Thank you for using Bank!")
			return
		}
	}

}
