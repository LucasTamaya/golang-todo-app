import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getAllTodos } from "../api/todo";
import ITodo from "../interfaces/todo";

const useAllTodos = (): UseQueryResult<ITodo[]> => {
  return useQuery(["todos"], getAllTodos);
};

export default useAllTodos;
