package main

import (
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

	// var data int

	// if data != nil {
	// 	fmt.Println("The data is not nil")
	// } else {
	// 	fmt.Println("The data is nil")
	// }

	app.Get("/todos", GetAllTodos)
	app.Get("/todo/:id", GetTodo)
	app.Post("/todo", CreateTodo)

	// run the app on port 8080
	log.Fatal(app.Listen(":8080"))
}
