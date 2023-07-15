"use client"
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Dropdown from "@/components/DropDown";
import useApi from "@/hooks/useApi";
import FlipCard from "@/components/FlipCard";
import Navbar from "@/components/NabBar";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useGetFavoriteGames } from "@/services/favoriteGame";
import { useGetRatingGames } from "@/services/rateGame";

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
  rate?: number;
}

export default function Home() {
  const [search, setSearch] = useState<string>();
  const authenticated = useAuthContext()
  const favoriteGameIds = useGetFavoriteGames(authenticated?.uid);  
  const rateGames = useGetRatingGames(authenticated?.uid);  

  const [gameGenre, setGameGenre] = useState("");
  const [filterFavorites,setFilterFavorites] = useState(false)
  const {
    data: games,
    error,
    isLoading,
  } = useApi<Game[]>(
    "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/"
  );

  const sortedGames = games?.sort((a, b) => {
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


  const mapedRateGames = ((game: Game) => {
    const findGame = rateGames?.find(rate=>rate.id === game.id)

    return {
      ...game,
      rate: findGame?.rate,
    };
  });


  const mapedFavoriteGames = ((game: Game) => {
    const isFavorite = favoriteGameIds.includes(game.id);
    return {
      ...game,
      favorite: isFavorite,
    };
  });

  const mapedGames:ExtendedGame[] | undefined = 
  sortedGames?.map(mapedRateGames)?.map(mapedFavoriteGames)

  const filterByFavorites = (game: Game & {favorite:boolean}) => {
    if (filterFavorites) {
      return game.favorite;
    }
    return game;
  }
  
  const filterByGenreOrSearch = (game: Game) =>{
    if (!gameGenre && !search) {
      return game;
    }
    if (search) {
      return game.title.toLowerCase().includes(search.trim() || "");
    }
    return game.genre === gameGenre;
  }

  const filteredGames = 
  mapedGames?.filter(filterByFavorites).filter(filterByGenreOrSearch);


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

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const renderBody = () => {
    if (isLoading) {
      return  <LoadingComponent />;
    }
    if (error) {
      return <ErrorComponent error={error}/>;
    }

    return (
      <>
        <main className="flex flex-col items-center justify-between p-24 pt-4">
          <div className="text-sm lg:flex-grow self-end mb-5 hidden lg:block">
            <Dropdown
              option={gamesGenres}
              selectedValue={(option) =>
                setGameGenre(option === "Genres" ? "" : option)
              }
              resetFilter={search !== ""}
            />
            <button className="mr-2" onClick={()=>setFilterFavorites(!filterFavorites)}>Favorites</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-max">
            {filteredGames?.map((game) => (
              
              <FlipCard
                key={game.id}
                front={
                  <Card
                    front
                    gameData={game}
                  />
                }
                back={
                  <Card
                    gameData={game}

                  />
                }
              />
            ))}
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
