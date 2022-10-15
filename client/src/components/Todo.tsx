import ITodo from "../interfaces/todo";
import checkIcon from "../assets/img/check_icon.svg";
import uncheckIcon from "../assets/img/uncheck_icon.svg";

const baseStyle =
  "flex flex-row justify-between items-center border rounded cursor-pointer p-2";

const Todo: React.FC<ITodo> = ({ title, done }) => {
  return (
    <li className={`${baseStyle} ${done ? "border-teal-400" : ""}`}>
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
