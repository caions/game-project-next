import { createContext, useEffect, useState } from 'react';
import { auth } from '@/config/firebase';
import { User } from 'firebase/auth';

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<User | null>(null);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthState = () => {
      auth.onAuthStateChanged((user) => {
        setAuthenticated(user);
      });
    };

    checkAuthState();
  }, []);

  return (
    <AuthContext.Provider value={authenticated}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
