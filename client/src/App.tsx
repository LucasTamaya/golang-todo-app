import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";

import Helmet from "./components/common/Helmet";
import ITodo from "./interfaces/todo";
import fetchAddTodo from "./api/addTodo";

const App: React.FC = () => {
  const [todosList, setTodosList] = useState<ITodo[]>([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoBody, setTodoBody] = useState("");

  const addTodo = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): ITodo | undefined => {
    e.preventDefault();

    if (todoTitle === "" || todoBody === "") {
      return;
    }

    const newTodo = {
      id: uuidv4(),
      title: todoTitle,
      body: todoBody,
      done: false,
    };

    // update the front
    setTodosList((prev) => [...prev, newTodo]);

    // update the back
    mutate(newTodo);
  };

  const { mutate } = useMutation((newTodo: ITodo) => {
    return fetchAddTodo(newTodo);
  });

  return (
    <>
      <Helmet
        content="Welcome to this simple todo app build with React JS and Golang!"
        title="Golang Todo App"
        path="/"
      />
      <main className="w-full min-h-screen bg-slate-100">
        <h1 className="text-teal-300 text-3xl text-center font-bold pt-10">
          Golang Todo App
        </h1>

        <div className="max-w-2xl mx-auto">
          <form className="flex flex-col gap-y-5  p-3 mt-10">
            <input
              type="text"
              id="todo"
              className="p-2 outline-none shadow-lg rounded"
              placeholder="Title"
              onChange={(e) => setTodoTitle(e.target.value)}
            />
            <textarea
              className="p-2 outline-none h-48 shadow-lg rounded resize-none"
              placeholder="Body"
              onChange={(e) => setTodoBody(e.target.value)}
            />
            <button
              className="p-2 rounded bg-teal-400 text-white font-bold"
              onClick={addTodo}
            >
              Add todo
            </button>
          </form>

          {todosList &&
            todosList.map((todo) => <p key={todo.id}>{todo.body}</p>)}
        </div>
      </main>
    </>
  );
};

export default App;
