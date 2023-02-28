import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="recaptcha-container" style={{ display: 'none' }}></div>
      </body>
    </Html>
  );
}
