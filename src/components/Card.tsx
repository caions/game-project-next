import Image from "next/image";
import React from "react";

type Card = {
  image: string;
  title: string;
  description: string;
  category: string;
  onClick: ()=>void
};

const Card: React.FC<Card> = ({ image, title, description, category, onClick }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col place-content-between hover:bg-[#27282e]">
      <div>
        <Image src={image} alt="img" width={700} height={700} />
        <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base text-[#ffffffa2]">{description}</p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span onClick={onClick} className="cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {category}
        </span>
      </div>
    </div>
  );
};

export default Card;
