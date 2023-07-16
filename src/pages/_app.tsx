import "../app/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from '../context/AuthContext';
import ToastContainer from "@/components/ToastContainer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthProvider>
  );
}
