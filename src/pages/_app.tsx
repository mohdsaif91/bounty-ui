import type { AppProps } from "next/app";

import Navbar from "@/Components/Navbar";

import "@/styles/globals.module.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
