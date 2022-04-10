import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          async
          defer
          data-website-id={process.env.NEXT_PUBLIC_DOCUMENT_ID}
          src="https://umami-production-950e.up.railway.app/umami.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
