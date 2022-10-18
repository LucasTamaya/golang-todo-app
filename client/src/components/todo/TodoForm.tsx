import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import Button from "../common/Button";
import ITodo from "../../interfaces/todo";
import { AppContext, AppContextType } from "../../context/AppContext";
import { createTodo } from "../../api/todo";

const TodoForm: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoBody, setTodoBody] = useState("");

  const { setTodosList } = useContext(AppContext) as AppContextType;

  // create a new todo
  const { mutate: handleCreateTodo } = useMutation((newTodo: ITodo) => {
    return createTodo(newTodo);
  });

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
    setTodosList((prev: ITodo[]) => [...prev, newTodo]);

    // update on the server
    handleCreateTodo(newTodo);
  };

  return (
    <form className="flex flex-col gap-y-5 p-3 mt-10">
      <div className="flex flex-col gap-y-2">
        <label htmlFor="todo" className="text-teal-400 font-bold">
          Title
        </label>
        <input
          type="text"
          id="todo"
          className="p-2 outline-none shadow-lg rounded"
          placeholder="Title"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="body" className="text-teal-400 font-bold">
          Body
        </label>
        <textarea
          id="body"
          className="p-2 outline-none h-48 shadow-lg rounded resize-none"
          placeholder="Body"
          value={todoBody}
          onChange={(e) => setTodoBody(e.target.value)}
        />
      </div>
      <Button title="Add a todo" bgColor="bg-teal-400" onClick={addTodo} />
    </form>
  );
};

export default TodoForm;
