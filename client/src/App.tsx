import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";

import Helmet from "./components/common/Helmet";
import ITodo from "./interfaces/todo";
import { createTodo } from "./api/todo";
import useAllTodos from "./hooks/useAllTodos";
import TodoCard from "./components/todo/TodoCard";
import Button from "./components/common/Button";
import { AppContext } from "./context/AppContext";
import Loader from "./components/common/Loader";
import ErrorMessage from "./components/common/ErrorMessage";

const App: React.FC = () => {
  const [todosList, setTodosList] = useState<ITodo[]>([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoBody, setTodoBody] = useState("");

  // get all todos
  const { isLoading, isSuccess, isError, data: todos } = useAllTodos();

  // create a new todo
  const { mutate } = useMutation((newTodo: ITodo) => {
    return createTodo(newTodo);
  });

  useEffect(() => {
    if (isSuccess && todos.length > 0) {
      setTodosList(todos);
    }
  }, [isSuccess, todos]);

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

    // clear inputs
    setTodoTitle("");
    setTodoBody("");

    // update the front
    setTodosList((prev) => [...prev, newTodo]);

    // update on the server
    mutate(newTodo);
  };

  return (
    <AppContext.Provider
      value={{
        todosList,
        setTodosList,
      }}
    >
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
          <form className="flex flex-col gap-y-5 p-3 mt-10">
            <input
              type="text"
              id="todo"
              className="p-2 outline-none shadow-lg rounded"
              placeholder="Title"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
            <textarea
              className="p-2 outline-none h-48 shadow-lg rounded resize-none"
              placeholder="Body"
              value={todoBody}
              onChange={(e) => setTodoBody(e.target.value)}
            />
            <Button
              title="Add a todo"
              bgColor="bg-teal-400"
              onClick={addTodo}
            />
          </form>

          {isLoading ? <Loader /> : null}

          {isError ? (
            <ErrorMessage message="Oops, something went wrong on the server" />
          ) : null}

          <ul className="flex flex-col gap-y-5 p-3">
            {todosList
              ? todosList.map(({ id, title, body, done }) => (
                  <TodoCard
                    key={id}
                    id={id}
                    title={title}
                    body={body}
                    done={done}
                  />
                ))
              : null}
          </ul>
        </div>
      </main>
    </AppContext.Provider>
  );
};

export default App;
