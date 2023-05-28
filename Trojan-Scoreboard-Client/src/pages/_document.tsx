import { Html, Head, Main, NextScript } from 'next/document'
import {Messages} from "primereact/messages";

export default function Document() {
  return (
    <Html lang="en">
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossOrigin="anonymous"
        />
      <Head />
      <body>
      <Main />
        <NextScript />
      </body>
    </Html>
  )
}
