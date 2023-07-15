import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface OrderButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick: (order: string) => void;
}

const OrderButton: React.FC<OrderButtonProps> = ({
  className,
  children,
  onClick,
}) => {
  const [order, setOrder] = useState("OFF");

  const handleClick = () => {
    if (order === "OFF") {
      setOrder("ASC");
      onClick("ASC");
    } else if (order === "ASC") {
      setOrder("DESC");
      onClick("DESC");
    } else {
      setOrder("OFF");
      onClick("OFF");
    }
  };

  let icon = null;

  if (order === "ASC") {
    icon = <FaArrowUp className="inline ml-1" />;
  } else if (order === "DESC") {
    icon = <FaArrowDown className="inline ml-1" />;
  }

  return (
    <button
      className={`bg-${
        order !== "OFF" ? "yellow" : "gray"
      }-500 text-gray-700 font-medium px-4 py-2 rounded-md ${className}`}
      onClick={handleClick}
    >
      {children}
      {icon}
    </button>
  );
};

export default OrderButton;
