import Image from "next/image";
import spinner from "../../public/spinner.svg";

const LoadingComponent = () => {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className="flex items-center space-x-2 justify-center h-screen"
    >
      <Image
        className="h-7 w-7 animate-spin stroke-gray-500"
        style={{
          filter: "grayscale(1) brightness(0) invert(1)",
        }}
        priority
        src={spinner}
        alt="logo"
      />
      <span className="text-md font-medium">Loading...</span>
    </div>
  );
};

export default LoadingComponent;
