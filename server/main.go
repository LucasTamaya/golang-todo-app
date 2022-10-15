package main

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"github.com/gofiber/fiber/v2/middleware/cors"
)

// func getBase(ctx *fiber.Ctx) error {
// 	return ctx.Status(fiber.StatusOK).SendString("Welcome to my rest api")
// }

// struct are similar to object in JS
type Todo struct {
	// quotes will be used to send json response
	ID    string `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
	Done  bool   `json:"done"`
}

var Todos = []Todo{}

func main() {
	// init the app
	app := fiber.New()

	// handler CORS error
	app.Use(cors.New())

	app.Get("/todos", GetAllTodos)
	app.Get("/todo/:id", GetTodo)
	app.Post("/todo", CreateTodo)
	app.Patch("/todo/:id", ToggleTodo)

	// run the app on port 8080
	log.Fatal(app.Listen(":8080"))
}
