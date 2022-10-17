import { useEffect, useState } from "react";

import Helmet from "./components/common/Helmet";
import ITodo from "./interfaces/todo";
import useAllTodos from "./hooks/useAllTodos";
import TodoCard from "./components/todo/TodoCard";
import { AppContext } from "./context/AppContext";
import Loader from "./components/common/Loader";
import ErrorMessage from "./components/common/ErrorMessage";
import TodoForm from "./components/todo/TodoForm";

const App: React.FC = () => {
  const [todosList, setTodosList] = useState<ITodo[]>([]);

  // get all todos
  const { isLoading, isSuccess, isError, data: todos } = useAllTodos();

  useEffect(() => {
    if (isSuccess && todos.length > 0) {
      setTodosList(todos);
    }
  }, [isSuccess, todos]);

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
          <TodoForm />

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
