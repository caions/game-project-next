"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Image from "next/image";
import Dropdown from "@/components/DropDown";
import useApi from "@/hooks/useApi";
import logoApp from "../../public/logo-appmasters.svg";
import crash from "../../public/crash.svg";
import spinner from "../../public/spinner.svg";
import FlipCard from "@/components/FlipCard";

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
      return game.title.toLowerCase().includes(search.trim() || "");
    }
    return game.genre === gameGenre;
  });

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
      return (
        <div
          aria-label="Loading..."
          role="status"
          className="flex items-center space-x-2 justify-center h-screen"
        >
          <Image
            className="h-7 w-7 animate-spin stroke-gray-500"
            style={{
              filter: "grayscale(1) brightness(0) invert(1)",
            }}
            priority
            src={spinner}
            alt="logo"
          />
          <span className="text-md font-medium">Loading...</span>
        </div>
      );
    }
    if (error) {
      return (
        <div
          role="status"
          className="flex items-center space-x-2 justify-center h-screen flex-col"
        >
          <Image
            className="h-12 w-12"
            style={{
              filter: "grayscale(1) brightness(0) invert(1)",
            }}
            priority
            src={crash}
            alt="logo"
          />
          <span className="mt-2 text-xl font-medium">{error}</span>
        </div>
      );
    }

    return (
      <>
        <nav className="flex items-center md:justify-between justify-center flex-wrap bg-[#000066] px-24 py-1">
          <div className="flex items-center flex-shrink-0 text-white mr-6 w-60 mt-1">
            <Image
              style={{
                filter: "grayscale(1) brightness(0) invert(1)",
              }}
              priority
              src={logoApp}
              alt="logo"
            />
          </div>
          <div className="flex items-center">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto justify-end">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Search"
              />
            </div>
            <div className="absolute top-4 right-8">
              <div className="block lg:hidden">
                <button
                  className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                  onClick={toggleSidebar}
                >
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
              <div
                className={`fixed z-50 inset-0 lg:hidden
               ${showSidebar ? "" : "hidden"}`}
              >
                <div
                  onClick={() => setShowSidebar(false)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                ></div>
                <div
                  className={`fixed top-4 right-4 w-full max-w-[17rem] bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900 h-[87vh] overflow-scroll`}
                >
                  <button
                    onClick={toggleSidebar}
                    type="button"
                    className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600"
                  >
                    <svg
                      viewBox="0 0 10 10"
                      className="w-2.5 h-2.5 overflow-visible"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 0L10 10M10 0L0 10"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                  </button>
                  <ul className="space-y-3 overflow-hidden">
                    {gamesGenres.map((game, index) => (
                      <li
                        key={index}
                        className={`cursor-pointer 
                        ${
                          gameGenre === game || (!gameGenre && index === 0)
                            ? "text-sky-500"
                            : ""
                        }`}
                      >
                        <span
                          className={`hover:text-sky-500`}
                          onClick={() => {
                            setGameGenre(game === "Genres" ? "" : game);
                          }}
                        >
                          {game}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex flex-col items-center justify-between p-24 pt-4">
          <div className="text-sm lg:flex-grow self-end mb-5 hidden lg:block">
            <Dropdown
              option={gamesGenres}
              selectedValue={(option) =>
                setGameGenre(option === "Genres" ? "" : option)
              }
              resetFilter={search !== ""}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-max">
            {filteredGames?.map((game) => (
              <FlipCard
                key={game.id}
                front={
                  <Card
                    key={game.id}
                    image={game.thumbnail}
                    title={game.title}
                    category={game.genre}
                  />
                }
                back={
                  <Card
                    key={game.id}
                    title={game.title}
                    description={game.short_description}
                    play={game.game_url}
                  />
                }
              />
            ))}
          </div>
        </main>
      </>
    );
  };

  return renderBody();
}
