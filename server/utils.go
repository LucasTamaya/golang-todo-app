package main

import (
	"errors"
	"fmt"
)

// function that takes a int pointer as parameter
func GetTodoById(id *int) (Todo, error) {
	for _, t := range Todos {
		// if IDS correspond, we return the current todo
		if t.ID == *id {
			return t, nil
		}
	}
	// if we don't found the todo
	errResponse := fmt.Sprintf("We don't found the todo with the ID %v", *id)
	return Todo{}, errors.New(errResponse)
}
