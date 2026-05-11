import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from "next/app";
import { Fredoka } from "next/font/google";
import { ToastContainer } from "react-toastify";
// import styles from "@/styles/Home.module.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"]
}); 

export default function App({ Component, pageProps }: AppProps) {
  return (
  <main className={fredoka.variable}>
  <Component {...pageProps} />
  <ToastContainer/>
  </main>
)}

