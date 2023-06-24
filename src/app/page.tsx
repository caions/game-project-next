"use client";

import Card from "@/components/Card";
import axios, { AxiosHeaders } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const headers = new AxiosHeaders({ "dev-email-address": "dev@email.com" });
    axios
      .get<Game[]>(
        "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/",
        {
          headers,
        }
      )
      .then(({ data }) => {
        const sortedData = data.sort((a, b) => {
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

        setGames(sortedData);
      })
      .catch((e) => console.error(e));
  }, []);

  const gamesGenres = games
  .map((game) => game.genre)
  .filter((genre, index, self) => {
    return index === self.indexOf(genre);
  });
  console.log(gamesGenres)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="relative flex place-items-center">
      </header> 
      <div className="grid grid-cols-3 gap-4">
        {games.map((game) => (
          <Card key={game.id} image={game.thumbnail}/>
        ))}
      </div>
    </main>
  );
}
