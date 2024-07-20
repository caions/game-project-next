import { useAuthContext } from "@/hooks/useAuthContext";
import { ExtendedGame } from "@/pages";
import { toggleFavoriteGame } from "@/services/favoriteGame";
import {
  calculateTotalRating,
  saveRating,
  getGameRatings,
} from "@/services/ratingGame";
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
  const [totalRatings, setTotalRatings] = useState<number[]>([]);

  useEffect(() => {
    if (!authenticated) {
      setRatingState(0);
    }
  }, [authenticated]);

  useEffect(() => {
    getGameRatings(gameId).then((total: number[]) => {
      setTotalRatings(total);
    });
  }, [rating]);

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

  const handleMouseEnter = (star: number) => {
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
            className="absolute w-[300px] lg:w-[385px] -bottom-[3px] h-[57px] cursor-default flex justify-between items-center bg-[var(--color-card-bg)] bg-opacity-75 rounded-b-lg"
            onClick={handleFooterClick}
          >
            <div className="flex pl-3">
              {[1, 2, 3, 4].map((star) => (
                <FaStar
                  size={30}
                  key={star}
                  className={`cursor-pointer transition ease-in-out ${
                    ratingState && ratingState >= star
                      ? "text-[var(--color-star)]"
                      : "text-[var(--color-button-text)]"
                  }`}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
              <div className="ml-3 pt-1 text-[var(--color-text-primary)]">
                {totalRatings.length === 0
                  ? 0
                  : calculateTotalRating(totalRatings)}{" "}
                ( {totalRatings.length} )
              </div>
            </div>
            <div className="pr-3">
              <button
                className={`text-[var(--color-heart)] transition duration-300 ease-in-out ${
                  isClicked ? "scale-125" : ""
                }`}
              >
                <FaHeart
                  onClick={handleHeartClick}
                  size={30}
                  className={`cursor-pointer ${
                    favorite
                      ? "text-[var(--color-heart)]"
                      : "text-[var(--color-text-secondary)]"
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
