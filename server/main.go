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

var Todos = []Todo{}

func main() {
	// init the app
	app := fiber.New()

	// app.Get("/todo", getTodo)
	// app.Get("/todos", getAllTodos)
	app.Post("/todo", CreateTodo)

	// run the app on port 8080
	log.Fatal(app.Listen(":8080"))

	fmt.Println("App is running on port 8080")
}
