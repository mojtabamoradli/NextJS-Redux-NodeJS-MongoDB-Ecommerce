import { Html, Head, Main, NextScript } from "next/document";


export default function Document() {
  return (
    <Html lang="en">
            <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="128x128" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="" />
        <meta property="og:title" content="Web Developer" />
        <meta name="keywords" content=""/>
        <meta name="author" content="Mojtaba Moradli" />
        <link href="https://mojtabamoradli.ir/" rel="canonical" />
        <meta name="theme-color" content="#D2D2D2" />
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
