import { FC } from "react";

const Loader: FC = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-amber-950/5 flex justify-center items-center">
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
