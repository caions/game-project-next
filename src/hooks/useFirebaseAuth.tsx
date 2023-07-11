import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";
import { useState } from "react";

export const useFireBaseAuth = (email: string, password: string) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signup = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuário cadastrado com sucesso!");
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("erro:", errorCode, errorMessage);
      })
      .finally(() => setLoading(false));
  };

  const login = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario logado com sucesso");
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("erro:", errorCode, errorMessage);
      })
      .finally(() => setLoading(false));
  };

  return { loading, signup, login };
};
