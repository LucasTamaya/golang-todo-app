package main

import (
	"github.com/gofiber/fiber/v2"
)

func CreateTodo(c *fiber.Ctx) error {
	// create an empty Todo struct and get its pointer
	todo := &Todo{}

	// here we try to parse the Body from the req into the todo struct
	// if there is an err
	if err := c.BodyParser(todo); err != nil {
		return err
	}

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
	// get the id from the url params
	id := c.Params("id")

	t, err := GetTodoById(&id)

	if err != nil {
		return c.Status(fiber.StatusNotFound).SendString(err.Error())
	}

	return c.Status(fiber.StatusOK).JSON(t)

}

func ToggleTodo(c *fiber.Ctx) error {
	// get the id from the url params
	id := c.Params("id")

	// update the Todos list
	for i, t := range Todos {
		if t.ID == id {
			Todos[i].Done = !Todos[i].Done
			return c.Status(fiber.StatusOK).JSON(Todos)
		}
	}

	// return an error message
	return c.Status(fiber.StatusNotFound).SendString("We don't found the todo")
}
