package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

// func getBase(ctx *fiber.Ctx) error {
// 	return ctx.Status(fiber.StatusOK).SendString("Welcome to my rest api")
// }

// struct are similar to object in JS
type Todo struct {
	// quotes will be used to send json response
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

var todos = []Todo{}

func createTodo(c *fiber.Ctx) error {
	// create an empty Todo struct and get its pointer
	todo := &Todo{}

	// here we try to parse the Body from the req into the todo struct
	// if there is an err
	if err := c.BodyParser(todo); err != nil {
		return err
	}

	// if no error
	// we create an ID
	todo.ID = len(todos) + 1

	// we update the list of todos
	todos = append(todos, *todo)

	return c.Status(fiber.StatusOK).JSON(todos)

}

func main() {
	// init the app
	app := fiber.New()

	// declare an empty slice of Todo type
	// todos := []Todo{}

	// app.Get("/", getBase)
	app.Post("/todo", createTodo)

	// run the app on port 8080
	log.Fatal(app.Listen(":8080"))

	fmt.Println("App is running on port 8080")
}
