package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	note "github.com/saurabhdagwar/Go_Learning/tree/main/notes_store/note"
	todo "github.com/saurabhdagwar/Go_Learning/tree/main/notes_store/todo"
)

type saver interface {
	Save() error
}

type outputable interface {
	saver
	Display()
}

func main() {
	// Note Same and Display
	reader := bufio.NewReader(os.Stdin)
	title, content := getNoteData(reader)

	userNote, err := note.New(title, content)
	outputData(userNote, err)
	// Todo Save and Display
	todoText := getUserInput(reader, "Todo text: ")
	todo, err := todo.New(todoText)
	outputData(todo, err)
}

func outputData(data outputable, err error) {
	if err != nil {
		fmt.Println(err)
		return
	}
	data.Display()
	saveData(data)
}

func saveData(data saver) error {
	err := data.Save()
	if err != nil {
		fmt.Println("Failed Saving Todo:", err)
		return err
	}
	fmt.Println("Saving Todo Successfully")
	return nil
}
func getNoteData(reader *bufio.Reader) (string, string) {
	title := getUserInput(reader, "Note Title: ")

	content := getUserInput(reader, "Note Content: ")

	return title, content
}

func getUserInput(reader *bufio.Reader, prompt string) string {
	fmt.Print(prompt)
	// var value string
	// fmt.Scanln(&value)

	text, err := reader.ReadString('\n')
	if err != nil {
		return ""
	}
	return strings.TrimSpace(text)
}
