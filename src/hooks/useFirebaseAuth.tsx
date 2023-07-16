import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";

export const useFireBaseAuth = (email: string, password: string) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signup = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Account created successfully!")
        router.push("/");
      })
      .catch((error) => {
        if(error.code === "auth/email-already-in-use"){
          toast.warning("Email already in use. Please use a different email or try logging in.");
          return
        }
        toast.error(`Internal server error: ${error.code}`)
      })
      .finally(() => setLoading(false));
  };

  const login = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login successful!");
        router.push("/");
      })
      .catch((error: FirebaseError) => {
        if(error.message.includes("login attempts")){
          toast.warning("Account temporarily blocked due to multiple login attempts. Please try again later.");
          return
        }
        if(error.code === "auth/user-not-found" || "auth/wrong-password"){
          toast.warning("Incorrect username or password");
          return
        }
        toast.error(`Internal server error: ${error.code}`)
      })
      .finally(() => setLoading(false));
  };

  return { loading, signup, login };
};
