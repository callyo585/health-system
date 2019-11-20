import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=McLaren&display=swap" rel="stylesheet" />
          <link rel="icon" href="/smiley64.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>

        <style global jsx>
          {`
            body {
              font-family: "McLaren", cursive;
            }
          `}
        </style>
      </html>
    );
  }
}
