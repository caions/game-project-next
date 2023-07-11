import AuthContext from "@/context/AuthContext";
import { User } from "firebase/auth";
import { useContext } from "react";

export const useAuthContext = (): User | null => {
  const authenticated = useContext(AuthContext);
  return authenticated;
};
