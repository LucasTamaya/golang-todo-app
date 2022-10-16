import { ClipLoader } from "react-spinners";

const Loader: React.FC = () => {
  return (
    <div className="w-full flex flex-row justify-center items-center">
      <ClipLoader color="#5EEAD4" />
    </div>
  );
};

export default Loader;
