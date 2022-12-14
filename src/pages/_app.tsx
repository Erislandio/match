import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/footer/footer";
import Header from "../components/Header/Header";
import { Fragment } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Fragment>
  );
}

export default MyApp;
