import { db } from '@/config/firebase';
import { collection, query, where, deleteDoc, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react';

export const toggleFavoriteGame = async (userId: string, gameId: number) => {
  try {
    const favoritesRef = collection(db, "favorites");
    const docId = `${userId}_${gameId}`;
    const docRef = doc(favoritesRef, docId);
    const documentSnapshot = await getDoc(docRef);

    if (documentSnapshot.exists()) {
      await deleteDoc(docRef);
      return;
    }
    await setDoc(docRef, { userId, gameId });

  } catch (error) {
    console.error("Erro ao favoritar/desfavoritar jogo:", error);
  }
};

export const useGetFavoriteGames = (userId?: string) => {
  const [favoriteGames, setFavoriteGames] = useState<number[]>([]);

  useEffect(() => {
    if (userId) {
      const favoritesRef = collection(db, "favorites");
      const queryRef = query(favoritesRef, where("userId", "==", userId));

      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const favoritesIds = snapshot.docs.map((doc) => doc.data().gameId);
        setFavoriteGames(favoritesIds);
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