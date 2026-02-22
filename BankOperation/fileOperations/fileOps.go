package fileOperations

import (
	"errors"
	"fmt"
	"os"
	"strconv"
)

func GetFloatFromFile(fileName string) (float64, error) {
	data, err := os.ReadFile(fileName)

	if err != nil {
		return 1000, errors.New("Failed to read File")
	}
	valueText := string(data)
	value, err := strconv.ParseFloat(valueText, 64)

	if err != nil {
		return 1000, errors.New("Failed to parse read value")
	}
	return value, nil
}

func WriteFloatToFile(fileName string, balance float64) {
	valueText := fmt.Sprint(balance)
	os.WriteFile(fileName, []byte(valueText), 0644)
}
