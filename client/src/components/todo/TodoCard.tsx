import { useState } from "react";

import ITodo from "../../interfaces/todo";
import checkIcon from "../../assets/img/check_icon.svg";
import uncheckIcon from "../../assets/img/uncheck_icon.svg";
import TodoDetails from "./TodoDetails";

const baseStyle =
  "flex flex-row justify-between items-center border rounded cursor-pointer p-2";

const Todo: React.FC<ITodo> = ({ title, body, done, id }) => {
  const [showDetails, setShowDetails] = useState(false);

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

      {showDetails ? (
        <TodoDetails
          id={id}
          title={title}
          body={body}
          done={done}
          setShowDetails={setShowDetails}
        />
      ) : null}
    </>
  );
};

export default Todo;
