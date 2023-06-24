"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Dropdown from "@/components/DropDown";
import useApi from "@/hooks/useApi";

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

export default function Home() {
  const [search, setSearch] = useState<string>();
  const [gameGenre, setGameGenre] = useState("");
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

  const filteredGames = sortedGames?.filter((game) => {
    if (!gameGenre && !search) {
      return game;
    }
    if (search) {
      return game.title.toLowerCase().includes(search || "");
    }
    return game.genre === gameGenre;
  });

  useEffect(() => {
    if (gameGenre) setSearch("");
  }, [gameGenre]);

  const gamesGenres =
    games
      ?.map((game) => game.genre)
      .filter((genre, index, self) => {
        return index === self.indexOf(genre);
      }) || [];

  const renderBody = () => {
    if (isLoading) {
      return <h1>Loading...</h1>
    }
    if (error) {
      return <h1>{error}</h1>
    }

    return (
      <>
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <svg
              className="fill-current h-8 w-8 mr-2"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <span className="font-semibold text-xl tracking-tight">
              Tailwind CSS
            </span>
          </div>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <Dropdown
                option={["Todos", ...gamesGenres]}
                selectedValue={(option) =>
                  setGameGenre(option === "Todos" ? "" : option)
                }
                resetFilter={search !== ""}
              />
            </div>
            <div>
              <div className="mb-4">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="searchgame"
                  type="text"
                  placeholder="Procurar um jogo"
                />
              </div>
            </div>
          </div>
        </nav>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="grid grid-cols-3 gap-4">
            {filteredGames?.map((game) => (
              <Card
                key={game.id}
                image={game.thumbnail}
                title={game.title}
                description={game.short_description}
                category={game.genre}
                onClick={() => {
                  setGameGenre(game.genre);
                }}
              />
            ))}
          </div>
        </main>
      </>
    );
  };

  return renderBody();
}
