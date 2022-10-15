import axios from "axios";

import API_BASE_URL from "../constants/url";
import ITodo from "../interfaces/todo";

export const getAllTodos = async (): Promise<ITodo[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/todos`);

  console.log(data);

  return data;
};

export const createTodo = async (todo: ITodo): Promise<any> => {
  const { id, title, body, done } = todo;

  console.log(todo);

  const { data } = await axios.post(`${API_BASE_URL}/todo`, {
    id,
    title,
    body,
    done,
  });

  console.log(data);

  return data;
};
