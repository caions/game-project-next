import { db } from '@/config/firebase';
import { collection, query, where, deleteDoc, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const toggleFavoriteGame = async (userId: string, gameId: number) => {
  try {
    const favoritesRef = collection(db, "favorites");
    const docId = `${userId}_${gameId}`;
    const docRef = doc(favoritesRef, docId);
    const documentSnapshot = await getDoc(docRef);

    if (documentSnapshot.exists()) {
      await deleteDoc(docRef);
      toast.success("Game unfavorited successfully!");
      return;
    }
    await setDoc(docRef, { userId, gameId });
    toast.success("Game favorited successfully!");
  } catch (error) {
    toast.error("Error favoriting/unfavoriting game");
  }
};

export const useGetFavoriteGames = (userId?: string) => {
  const [favoriteGames, setFavoriteGames] = useState<number[]>([]);

  useEffect(() => {
    if (userId) {
      const favoritesRef = collection(db, "favorites");
      const queryRef = query(favoritesRef, where("userId", "==", userId));

      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        try {
          const favoritesIds = snapshot.docs.map((doc) => doc.data().gameId);
          setFavoriteGames(favoritesIds);
        } catch (error) {
          toast.error("Error retrieving your favorite games");
        }
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [userId]);

  return favoriteGames;
};