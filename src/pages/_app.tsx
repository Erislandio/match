import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/footer/footer";
import Header from "../components/Header/Header";
import { Fragment } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </Fragment>
  );
}

export default MyApp;
