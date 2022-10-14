package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"

	"strconv"
)

func CreateTodo(c *fiber.Ctx) error {
	// create an empty Todo struct and get its pointer
	todo := &Todo{}

	// here we try to parse the Body from the req into the todo struct
	// if there is an err
	if err := c.BodyParser(todo); err != nil {
		return err
	}

	// if no error
	// we create an ID
	todo.ID = len(Todos) + 1

	// we update the list of Todos
	Todos = append(Todos, *todo)

	return c.Status(fiber.StatusOK).JSON(Todos)
}

func GetAllTodos(c *fiber.Ctx) error {
	if len(Todos) == 0 {
		return c.Status(fiber.StatusNotFound).SendString("No todos found...")
	} else {
		return c.Status(fiber.StatusOK).JSON(Todos)
	}
}

func GetTodo(c *fiber.Ctx) error {
	// it will contain the todo to return
	todo := &Todo{}

	// get the id from the url params
	strId := c.Params("id")

	// convert string to int
	intId, err := strconv.Atoi(strId)

	if err != nil {
		return err
	}

	// get the todo with the given id
	for _, t := range Todos {
		// if IDS correspond, we append the current todo to the value of the pointer todo
		if t.ID == intId {
			*todo = t
			return c.Status(fiber.StatusOK).JSON(todo)
		}
	}

	errResponse := fmt.Sprintf("We don't found the todo with the ID %v", strId)

	return c.Status(fiber.StatusNotFound).SendString(errResponse)

}
