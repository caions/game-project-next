import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { useAuthContext } from "@/hooks/useAuthContext";
import {toggleFavoriteGame} from "@/services/favoriteGame";
import { Game } from "@/pages";


export type Card = {
  gameData: Game & {favorite: boolean},
  front?: boolean;
  onClick?: () => void;
};

const Card: React.FC<Card> = ({
  gameData,
  front,
  onClick
}) => {
  const {id,short_description,genre,thumbnail,title, game_url,favorite} = gameData
  const router = useRouter();
  const authenticated = useAuthContext()

  const handleHeartClick = () => {
    if(!authenticated){
      router.push("/auth");
      return
    }
    toggleFavoriteGame(authenticated.uid, id)
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex bg-blue-950 flex-col place-content-between relative">
      <div className="card-content" style={{ height: "250px" }}>
        {thumbnail && front && <Image src={thumbnail} alt="img" width={700} height={700} />}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          {!front && <p className="text-base text-[#ffffffa2]">{short_description}</p>}
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {front && genre && (
          <span
            onClick={onClick}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {genre}
          </span>
        )}
        {!front && game_url && (
          <a
            target="blank"
            href={game_url}
            onClick={onClick}
            className="inline-block bg-red-600 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2"
          >
            Play Now
          </a>
        )}
      </div>
      <div className="absolute bottom-0 right-0 p-2">
      <button
          onClick={handleHeartClick}
          className={`absolute bottom-4 right-4 ${favorite ? 'text-red-500' : 'text-white'}`}
        >
          <FaHeart size={20} />
        </button>
      </div>
      </div>
  );
};

export default Card;
