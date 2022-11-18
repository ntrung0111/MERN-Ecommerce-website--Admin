import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/_globals.scss";

import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";

import Loading from "../components/Loading";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // control loading state
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Koikko Vercel - Admin Dashboard</title>
      </Head>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Component {...pageProps} />
      </div>
      {loading && <Loading />}
    </Fragment>
  );
};

export default MyApp;
