import { db } from '@/config/firebase';
import { collection, query, where, doc, getDoc, setDoc, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

export const saveRating = async (userId: string, gameId: number, rating: number) => {
  try {
    const ratingsRef = collection(db, "ratings");
    const docId = `${userId}_${gameId}`;
    const docRef = doc(ratingsRef, docId);
    const existingRating = await getDoc(docRef);
    if (rating === 0 && existingRating.exists()) {
      await deleteDoc(docRef);
      return
    }
    if (existingRating.exists()) {
      await updateDoc(docRef, { rating: rating });
      return
    }
    await setDoc(docRef, { userId, gameId, rating });
  } catch (error) {
    console.error('Erro ao salvar a avaliação:', error);
  }
};

export const useGetRatingGames = (userId?: string) => {
  const [ratingGames, setRatingGames] = useState<Array<{ id: number, rating: number }>>([]);

  useEffect(() => {
    if (userId) {
      const ratingsRef = collection(db, "ratings");
      const queryRef = query(ratingsRef, where("userId", "==", userId));

      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const ratingsIds = snapshot.docs.map((doc) => ({
          id: doc.data().gameId,
          rating: doc.data().rating
        }));
        setRatingGames(ratingsIds);
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [userId]);

  return ratingGames;
};