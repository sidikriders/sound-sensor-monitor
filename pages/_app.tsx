import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <script src="https://unpkg.com/wavesurfer.js" async />
    </>
  );
}

export default MyApp;
