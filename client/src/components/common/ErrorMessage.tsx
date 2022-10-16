interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <p className="text-white text-center font-bold p-3 rounded bg-red-500">
      {message}
    </p>
  );
};

export default ErrorMessage;
