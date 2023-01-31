import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Header from "../components/Standards/Header";
import Footer from "../components/Standards/Footer";
import "react-toastify/dist/ReactToastify.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>ChallengeUs</title>
        <link
          rel="icon"
          type="image/x-icon"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
      </Head>
      <NextNProgress color="#ba3bdc" />
      <Header />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
