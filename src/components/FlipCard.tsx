import { useAuthContext } from "@/hooks/useAuthContext";
import { ExtendedGame } from "@/pages";
import { toggleFavoriteGame } from "@/services/favoriteGame";
import { saveRating } from "@/services/ratingGame";
import { useRouter } from "next/router";
import React, { ReactNode, memo, useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";

type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  gameData: ExtendedGame;
};

// eslint-disable-next-line react/display-name
const FlipCard: React.FC<FlipCardProps> = memo(({ front, back, gameData }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { id: gameId, favorite, rating } = gameData;
  const router = useRouter();
  const authenticated = useAuthContext();
  const [ratingState, setRatingState] = useState(rating);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(()=>{
    if(!authenticated){
      setRatingState(0)
    }
  },[authenticated])

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleFooterClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleHeartClick = () => {
    setIsClicked(true);
    if (!authenticated) {
      router.push("/auth");
      return;
    }
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
    toggleFavoriteGame(authenticated.uid, gameId);
  };

  const handleMouseEnter = (star:number) => {
    setRatingState(star);
  };

  const handleMouseLeave = () => {
    setRatingState(rating);
  };

  const handleRatingClick = (selectedRating: number) => {
    const rating = selectedRating === ratingState ? 0 : selectedRating;
    if (!authenticated?.uid) {
      router.push("/auth");
      return;
    }
    saveRating(authenticated.uid, gameId, rating);
    setRatingState(rating);
  };

  return (
    <div
      className="w-[300px] lg:w-[400px] h-[313px] bg-transparent cursor-pointer group perspective"
      onClick={handleClick}
    >
      <div
        className={`relative preserve-3d ${
          isFlipped ? "my-rotate-y-180" : ""
        } w-full duration-700`}
      >
        <div className="absolute backface-hidden w-full">
          {front}
          <div
            className="absolute w-[300px] lg:w-[385px] -bottom-[3px] h-[57px] cursor-default flex justify-between items-center"
            onClick={handleFooterClick}
          >
            <div className="flex pl-3">
              {[1, 2, 3, 4].map((star) => (
                <FaStar
                  size={30}
                  key={star}
                  className={`cursor-pointer text-gray-500 transition ease-in-out ${
                    ratingState && ratingState >= star ? 'text-yellow-500' : ''
                  }`}
/*                   onMouseEnter={() => handleMouseEnter(star)}
                  onMouseLeave={handleMouseLeave} */
                  onClick={() => handleRatingClick(star)}
                />
              ))}
            </div>
            <div className="pr-3">
              <button
                className={`text-gray-500 transition duration-300 ease-in-out ${isClicked ? "scale-125" : ""}`}
              >
                <FaHeart
                  onClick={handleHeartClick}
                  size={30}
                  className={`cursor-pointer ${
                    favorite ? "text-red-600" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute my-rotate-y-180 backface-hidden w-full overflow-hidden">
          {back}
        </div>
      </div>
    </div>
  );
});

export default FlipCard;
