interface Props {
  title: string;
  bgColor: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
}

const Button: React.FC<Props> = ({ title, bgColor, onClick }) => {
  return (
    <button
      className={`p-2 rounded text-white font-bold ${bgColor}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
