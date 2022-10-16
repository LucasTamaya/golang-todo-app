import axios from "axios";

import API_BASE_URL from "../constants/url";
import ITodo from "../interfaces/todo";

export const getAllTodos = async (): Promise<ITodo[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/todosfaegag`);

  return data;
};

export const createTodo = async (todo: ITodo): Promise<ITodo[]> => {
  const { id, title, body, done } = todo;

  const { data } = await axios.post(`${API_BASE_URL}/todo`, {
    id,
    title,
    body,
    done,
  });

  return data;
};

export const toggleTodo = async (id: string): Promise<ITodo[]> => {
  const { data } = await axios.patch(`${API_BASE_URL}/todo/${id}`);

  return data;
};

export const deleteTodo = async (id: string): Promise<ITodo[]> => {
  const { data } = await axios.delete(`${API_BASE_URL}/todo/${id}`);

  return data;
};
