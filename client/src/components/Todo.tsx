import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import ITodo from "../interfaces/todo";
import checkIcon from "../assets/img/check_icon.svg";
import uncheckIcon from "../assets/img/uncheck_icon.svg";
import { toggleTodo } from "../api/todo";
import Button from "./common/Button";

const baseStyle =
  "flex flex-row justify-between items-center border rounded cursor-pointer p-2";

interface Props extends ITodo {
  todosList: ITodo[];
  setTodosList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const Todo: React.FC<Props> = ({
  title,
  body,
  done,
  id,
  todosList,
  setTodosList,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const updateTodo = () => {
    const updatedTodosList = todosList.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });

    console.log(updatedTodosList);

    setTodosList(updatedTodosList);
    mutate(id);
  };

  // toggle todo status
  const { mutate } = useMutation((id: string) => {
    return toggleTodo(id);
  });

  return (
    <>
      <li
        className={`${baseStyle} ${done ? "border-teal-400" : ""}`}
        onClick={() => setShowDetails((prev) => !prev)}
      >
        <p className={`${done ? "line-through" : ""}`}>{title}</p>
        <img
          src={done ? checkIcon : uncheckIcon}
          alt="check icon"
          width={20}
          height={20}
        />
      </li>

      {showDetails && (
        <div
          className="absolute top-0 left-0 w-full h-screen flex flex-row justify-center items-center bg-black/10"
          onClick={() => setShowDetails(false)}
        >
          <div className="w-full max-w-2xl flex flex-col bg-white rounded p-5">
            <h2 className="text-2xl text-teal-400 font-bold mb-2">Title</h2>
            <p className="mb-5">{title}</p>
            <h2 className="text-2xl text-teal-400 font-bold mb-2">Body</h2>
            <p className="mb-5">{body}</p>
            <Button
              title={`${done ? "Not yet finished" : "Marked as finished"}`}
              onClick={() => {
                updateTodo();
                setShowDetails(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
