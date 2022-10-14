package main

import "github.com/gofiber/fiber/v2"

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
