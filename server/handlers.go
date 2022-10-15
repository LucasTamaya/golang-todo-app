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
	// get the id from the url params
	id, err := c.ParamsInt("id")

	if err != nil {
		return err
	}

	t, err := GetTodoById(&id)

	if err != nil {
		return c.Status(fiber.StatusNotFound).SendString(err.Error())
	}

	return c.Status(fiber.StatusOK).JSON(t)

}

func ToggleTodo(c *fiber.Ctx) error {
	// get the id from the url params
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(fiber.StatusNotFound).SendString(err.Error())
	}

	// update the Todos list
	for i, t := range Todos {
		if t.ID == id {
			Todos[i].Done = !Todos[i].Done
		}
	}

	// return the updated todo
	return c.Status(fiber.StatusOK).JSON(Todos)
}
