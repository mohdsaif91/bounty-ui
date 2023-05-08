import type { AppProps } from "next/app";

import Navbar from "@/Components/Navbar";

import styles from "@/styles/globals.module.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${styles.main}`}>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
