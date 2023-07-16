import React from "react";
import Image from "next/image";
import { Game } from "@/pages";

export type Card = {
  gameData: Game & { favorite: boolean };
  front?: boolean;
  onClick?: () => void;
};

const Card: React.FC<Card> = ({ gameData, front, onClick }) => {
  const { short_description, genre, thumbnail, title, game_url } = gameData;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex bg-blue-950 flex-col place-content-between relative">
      <div className="card-content" style={{ height: "220px" }}>
        {thumbnail && front && (
          <Image src={thumbnail} alt="img" width={700} height={700} />
        )}
        <div className="px-6 py-4">
          {!front && (
            <p className="text-base text-[#ffffffa2]">{short_description}</p>
          )}
        </div>
      </div>
      <div className="pt-0 h-[90px]">
        {front && (
          <div className="justify-between flex mx-3">
            <div className="font-bold text-xl">{title}</div>
            <div
              onClick={onClick}
              className="inline-block bg-gray-200 mt-1 px-3 py-1 text-sm font-semibold text-gray-700 mb-2"
            >
              {genre}
            </div>
          </div>
        )}
        {!front && (
          <div className="pt-10 pr-2 flex justify-end">
            <a
              target="blank"
              href={game_url}
              onClick={onClick}
              className="h-[30px] inline-block bg-red-600 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2"
            >
              Play Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
