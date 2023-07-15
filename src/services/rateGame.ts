import { db } from '@/config/firebase';
import { collection, query, where, doc, getDoc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

export const saveRating = async (userId: string, gameId: number, rating: number) => {
  try {
    const ratingsRef = collection(db, "ratings");
    const docId = `${userId}_${gameId}`;
    const docRef = doc(ratingsRef, docId);
    const existingRating = await getDoc(docRef);

    if (!existingRating.exists()) {
      await setDoc(docRef, { userId, gameId, rating });
    } else {
      await updateDoc(docRef, { rating: rating });
    }
  } catch (error) {
    console.error('Erro ao salvar a avaliação:', error);
  }
};

export const useGetRatingGames = (userId?: string) => {
  const [rateGames, setRateGames] = useState<Array<{ id: number, rate: number }>>([]);

  useEffect(() => {
    if (userId) {
      const ratesRef = collection(db, "ratings");
      const queryRef = query(ratesRef, where("userId", "==", userId));

      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const ratesIds = snapshot.docs.map((doc) => ({
          id: doc.data().gameId,
          rate: doc.data().rating
        }));
        setRateGames(ratesIds);
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [userId]);

  return rateGames;
};