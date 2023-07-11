import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";
import { useState } from "react";

// Register
export const handleSignup = async (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      console.log("Usuário cadastrado com sucesso!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("erro:", errorCode, errorMessage);
    });
};

// Login
export const useFirebaseLogin = (email: string, password: string) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuario logado com sucesso");
      console.log(user);
      router.push("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("erro:", errorCode, errorMessage);
    })
    .finally(() => setLoading(false));
  }  

  return { loading, signIn };
};
