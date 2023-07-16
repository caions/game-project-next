import { db } from '@/config/firebase';
import { collection, query, where, doc, getDoc, setDoc, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const saveRating = async (userId: string, gameId: number, rating: number) => {
  try {
    const ratingsRef = collection(db, "ratings");
    const docId = `${userId}_${gameId}`;
    const docRef = doc(ratingsRef, docId);
    const existingRating = await getDoc(docRef);
    if (rating === 0 && existingRating.exists()) {
      await deleteDoc(docRef);
      toast.success("Rating removed successfully!");
      return
    }
    if (existingRating.exists()) {
      await updateDoc(docRef, { rating: rating });
      toast.success("Rating updated successfully!");
      return
    }
    toast.success("Rating saved successfully!");
    await setDoc(docRef, { userId, gameId, rating });
  } catch (error) {
    toast.error('Error while saving the review');
  }
};

export const useGetRatingGames = (userId?: string) => {
  const [ratingGames, setRatingGames] = useState<Array<{ id: number; rating: number }>>([]);

  useEffect(() => {
    if (userId) {
      const ratingsRef = collection(db, "ratings");
      const queryRef = query(ratingsRef, where("userId", "==", userId));
      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        try {
          const ratingsIds = snapshot.docs.map((doc) => ({
            id: doc.data().gameId,
            rating: doc.data().rating
          }));
          setRatingGames(ratingsIds);
        } catch (error) {
          toast.error("Error retrieving your ratings");
        }
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