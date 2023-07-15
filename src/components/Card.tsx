import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toggleFavoriteGame } from "@/services/favoriteGame";
import { ExtendedGame } from "@/pages";
import { FaStar } from "react-icons/fa";
import { saveRating } from "@/services/rateGame";

export type Card = {
  gameData: ExtendedGame;
  front?: boolean;
  onClick?: () => void;
};

const Card: React.FC<Card> = ({ gameData, front, onClick }) => {
  const {
    id: gameId,
    short_description,
    genre,
    thumbnail,
    title,
    game_url,
    favorite,
    rate,
  } = gameData;
  const router = useRouter();
  const authenticated = useAuthContext();
  const [rateState, setRateState] = useState(0);

  const handleHeartClick = () => {
    if (!authenticated) {
      router.push("/auth");
      return;
    }
    toggleFavoriteGame(authenticated.uid, gameId);
  };

  const handleRatingClick = (selectedRating: number) => {
    const rate = selectedRating === rateState ? 0 : selectedRating;
    if (!authenticated?.uid) {
      router.push("/auth");
      return;
    }
    saveRating(authenticated.uid, gameId, rate);
    setRateState(rate);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex bg-blue-950 flex-col place-content-between relative">
      <div className="flex justify-between">
        <button
          onClick={handleHeartClick}
          className={`${favorite ? "text-red-500" : "text-white"}`}
        >
          <FaHeart size={30} />
        </button>
        <div className="flex">
          {[1, 2, 3, 4].map((star) => (
            <FaStar
              size={30}
              key={star}
              className={`cursor-pointer mx-1 ${
                rate && rate >= star ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleRatingClick(star)}
            />
          ))}
        </div>
      </div>
      <div className="card-content" style={{ height: "250px" }}>
        {thumbnail && front && (
          <Image src={thumbnail} alt="img" width={700} height={700} />
        )}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          {!front && (
            <p className="text-base text-[#ffffffa2]">{short_description}</p>
          )}
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
    </div>
  );
};

export default Card;
