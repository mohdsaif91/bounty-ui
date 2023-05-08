import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&family=Roboto+Mono:wght@100&family=Source+Sans+Pro&family=Ubuntu:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body style={{ margin: 0 }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
