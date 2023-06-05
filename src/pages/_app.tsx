import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import Navbar from "@/Components/Navbar";
import { store } from "@/Redux/store";

import styles from "@/styles/globals.module.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={`${styles.main}`}>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
