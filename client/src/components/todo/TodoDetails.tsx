import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

import { toggleTodo, deleteTodo } from "../../api/todo";
import Button from "../common/Button";
import { AppContext, AppContextType } from "../../context/AppContext";
import ITodo from "../../interfaces/todo";

interface Props extends ITodo {
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoDetails: React.FC<Props> = ({
  id,
  title,
  body,
  done,
  setShowDetails,
}) => {
  // get todosList and setTodosList with the useContext hook
  const { todosList, setTodosList } = useContext(AppContext) as AppContextType;

  // toggle todo status
  const { mutate: handleToggle } = useMutation((id: string) => {
    return toggleTodo(id);
  });

  // delete a todo
  const { mutate: handleDelete } = useMutation((id: string) => {
    return deleteTodo(id);
  });

  const handleToggleTodo = () => {
    const updatedTodosList = todosList.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });

    setTodosList(updatedTodosList);
    handleToggle(id);
    setShowDetails(false);
  };

  const handleDeleteTodo = () => {
    const updatedTodosList = todosList.filter((todo) => todo.id !== id);

    setTodosList(updatedTodosList);
    handleDelete(id);
    setShowDetails(false);
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-screen flex flex-row justify-center items-center bg-black/10"
      onClick={() => setShowDetails(false)}
    >
      <div className="w-full max-w-2xl flex flex-col gap-y-3 bg-white rounded p-5">
        <h2 className="text-2xl text-teal-400 font-bold">Title</h2>
        <p className="mb-5">{title}</p>
        <h2 className="text-2xl text-teal-400 font-bold">Body</h2>
        <p className="mb-5">{body}</p>
        <Button
          title={`${done ? "Not yet finished" : "Marked as finished"}`}
          bgColor="bg-teal-400"
          onClick={handleToggleTodo}
        />
        <Button
          title="Delete"
          bgColor="bg-red-500"
          onClick={handleDeleteTodo}
        />
      </div>
    </div>
  );
};

export default TodoDetails;
