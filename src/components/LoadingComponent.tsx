import { Spinner } from "./Spinner";

const LoadingComponent = () => {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className="flex items-center space-x-2 justify-center h-screen"
    >
      <Spinner />
      <span className="text-md font-medium">Loading...</span>
    </div>
  );
};

export default LoadingComponent;
