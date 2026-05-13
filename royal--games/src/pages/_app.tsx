import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from "next/app";
import { Exo_2, Orbitron, Inter  } from "next/font/google";
import { ToastContainer } from "react-toastify";

const exo2 = Exo_2({
  variable: "--font-exo2",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"]
}); 

const orbitron = Orbitron({
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
  
})



export default function App({ Component, pageProps }: AppProps) {
  return (
  <main className={`${exo2.variable} ${orbitron.variable}`}>
  <Component {...pageProps} />
  <ToastContainer/>
  </main>
)}

