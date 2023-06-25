import Image from "next/image";
import crash from "../../public/crash.svg";

const ErrorComponent = ({ error }: { error: string }) => {
  return (
    <div
      role="status"
      className="flex items-center space-x-2 justify-center h-screen flex-col"
    >
      <Image
        className="h-12 w-12"
        style={{
          filter: "grayscale(1) brightness(0) invert(1)",
        }}
        priority
        src={crash}
        alt="logo"
      />
      <span className="mt-2 text-xl font-medium text-center">{error}</span>
    </div>
  );
};

export default ErrorComponent;
