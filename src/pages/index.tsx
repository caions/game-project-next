"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Dropdown from "@/components/DropDown";
import useApi from "@/hooks/useApi";
import FlipCard from "@/components/FlipCard";
import Navbar from "@/components/NavBar";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useGetFavoriteGames } from "@/services/favoriteGame";
import { useGetRatingGames } from "@/services/ratingGame";
import OrderButton from "@/components/OrderButton";
import mockedGameList from "@/mock/jsonData.json";

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export interface ExtendedGame extends Game {
  favorite: boolean;
  rating?: number;
}

export default function Home() {
  const [search, setSearch] = useState<string>();
  const authenticated = useAuthContext();
  const favoriteGameIds = useGetFavoriteGames(authenticated?.uid);
  const ratingGames = useGetRatingGames(authenticated?.uid);
  const [gameGenre, setGameGenre] = useState("");
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [ratingOrder, setRatingOrder] = useState<string>("OFF");
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const { data: games, error, isLoading } = mockedGameList;

  const sortGamesByTitle = games?.sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });

  const mapedRatingGames = (game: Game) => {
    const findGame = ratingGames?.find((rating) => rating.id === game.id);

    return {
      ...game,
      rating: findGame?.rating,
    };
  };

  const mapedFavoriteGames = (game: Game) => {
    const isFavorite = favoriteGameIds.includes(game.id);
    return {
      ...game,
      favorite: isFavorite,
    };
  };

  const gamesWithRatingAndFavorites: ExtendedGame[] | undefined =
    sortGamesByTitle?.map(mapedRatingGames)?.map(mapedFavoriteGames);

  if (ratingOrder !== "OFF") {
    gamesWithRatingAndFavorites?.sort((a, b) => {
      if (a.rating === undefined) return 1;
      if (b.rating === undefined) return -1;
      return ratingOrder === "ASC" ? a.rating - b.rating : b.rating - a.rating;
    });
  }

  const filterByFavorites = (game: Game & { favorite: boolean }) => {
    if (filterFavorites) {
      return game.favorite;
    }
    return game;
  };

  const filterByGenreOrSearch = (game: Game) => {
    if (!gameGenre && !search) {
      return game;
    }
    if (search) {
      return game.title.toLowerCase().includes(search.trim() || "");
    }
    return game.genre === gameGenre;
  };

  const filteredGames = gamesWithRatingAndFavorites
    ?.filter(filterByFavorites)
    .filter(filterByGenreOrSearch);

  useEffect(() => {
    if (gameGenre) setSearch("");
  }, [gameGenre]);

  const gamesGenres = [
    "Genres",
    ...(games
      ?.map((game) => game.genre)
      .filter((genre, index, self) => {
        return index === self.indexOf(genre);
      })
      .sort() || []),
  ];

  const renderBody = () => {
    if (isLoading) {
      return <LoadingComponent />;
    }
    if (error) {
      return <ErrorComponent error={"error"} />;
    }

    return (
      <>
        <main className="flex flex-col items-center justify-between p-24 pt-4">
          <div>
            <div className="lg:flex justify-end self-end">
              <div className="text-sm lg:flex justify-end self-end mb-5 hidden">
                <Dropdown
                  option={gamesGenres}
                  selectedValue={(option) =>
                    setGameGenre(option === "Genres" ? "" : option)
                  }
                  resetFilter={search !== ""}
                />
              </div>
              <div
                className={`text-sm flex lg:justify-end justify-center self-end mb-5 ${
                  !authenticated && "hidden"
                }`}
              >
                <OrderButton onClick={(order) => setRatingOrder(order)}>
                  Rating
                </OrderButton>
                <button
                  className={`${
                    filterFavorites
                      ? "bg-[var(--color-accent)] text-[var(--color-text-primary)]"
                      : "bg-[var(--color-secondary)] text-[var(--color-text-primary)]"
                  } font-medium mr-4 px-4 py-2 rounded-md`}
                  onClick={() => setFilterFavorites(!filterFavorites)}
                >
                  Favorites
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-max">
              {filteredGames?.map((game) => (
                <FlipCard
                  key={game.id}
                  gameData={game}
                  front={<Card front gameData={game} />}
                  back={<Card gameData={game} />}
                />
              ))}
            </div>
          </div>
        </main>
      </>
    );
  };

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        gameGenre={gameGenre}
        setGameGenre={setGameGenre}
        gamesGenres={gamesGenres}
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
      />
      {renderBody()}
    </>
  );
}
