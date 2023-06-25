import Image from "next/image";
import React from "react";

type Card = {
  image?: string;
  title?: string;
  description?: string;
  category?: string;
  play?: string;
  onClick?: () => void;
};

const Card: React.FC<Card> = ({
  image,
  title,
  description,
  category,
  play,
  onClick,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex bg-blue-950 flex-col place-content-between">
      <div className="card-content" style={{ height: "250px" }}>
        {image && <Image src={image} alt="img" width={700} height={700} />}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-base text-[#ffffffa2]">{description}</p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {category && (
          <span
            onClick={onClick}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {category}
          </span>
        )}
        {play && (
          <a
            target="blank"
            href={play}
            onClick={onClick}
            className="inline-block bg-red-600 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2"
          >
            Play Now
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
