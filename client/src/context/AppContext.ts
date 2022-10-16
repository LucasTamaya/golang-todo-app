import { createContext } from "react";

import ITodo from "../interfaces/todo";

export type AppContextType = {
  todosList: ITodo[];
  setTodosList: (todos: ITodo[]) => void;
};

export const AppContext = createContext<AppContextType | null>(null);
