package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"github.com/saurabhdagwar/Go_Learning/tree/main/notes_store/note"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	title, content := getNoteData(reader)
	userNote, err := note.New(title, content)
	if err != nil {
		fmt.Println(err)
		return
	}
	userNote.Display()
	err = userNote.Save()
	if err != nil {
		fmt.Println("Failed Saving note:", err)
		return
	}
	fmt.Println("Saving Note Successfully")
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
