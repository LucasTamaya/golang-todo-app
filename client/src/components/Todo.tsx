import { useMutation } from "@tanstack/react-query";

import ITodo from "../interfaces/todo";
import checkIcon from "../assets/img/check_icon.svg";
import uncheckIcon from "../assets/img/uncheck_icon.svg";
import { toggleTodo } from "../api/todo";

const baseStyle =
  "flex flex-row justify-between items-center border rounded cursor-pointer p-2";

interface Props extends ITodo {
  todosList: ITodo[];
  setTodosList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const Todo: React.FC<Props> = ({
  title,
  done,
  id,
  todosList,
  setTodosList,
}) => {
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
    <li
      className={`${baseStyle} ${done ? "border-teal-400" : ""}`}
      onClick={updateTodo}
    >
      <p>{title}</p>
      <img
        src={done ? checkIcon : uncheckIcon}
        alt="check icon"
        width={20}
        height={20}
      />
    </li>
  );
};

export default Todo;
