interface Props {
  title: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ title, onClick }) => {
  return (
    <button
      className="p-2 rounded bg-teal-400 text-white font-bold"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
