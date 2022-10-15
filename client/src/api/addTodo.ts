import axios from "axios";

import API_BASE_URL from "../constants/url";
import ITodo from "../interfaces/todo";

const fetchAddTodo = async (
  //   id: string,
  //   title: string,
  //   body: string,
  //   done: boolean
  todo: ITodo
): Promise<any> => {
  const { id, title, body, done } = todo;

  console.log(todo);

  const { data } = await axios.post(`${API_BASE_URL}/todo`, {
    // id: todo?.id,
    // title: todo?.title,
    // body: todo?.body,
    // done: todo?.done,
    id,
    title,
    body,
    done,
  });

  console.log(data);

  return data;
};

export default fetchAddTodo;
