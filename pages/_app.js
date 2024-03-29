import { Provider } from "react-redux";
import store, { persistor } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Modal from "@/components/Modal/Modal";
import { ModalProvider } from "@/context/ModalContext";
import Navbar from "@/components/Navbar/Navbar";
import "@/styles/globals.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import makeApiCall from "@/utils/makeApiCall";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const cookies = new Cookies();
  const token = cookies.get("refresh_token");
  //console.log(token);
  async function handleLogout() {
    //console.log(token);
    try {
      let response = await makeApiCall("POST", "/auth/logout", {
        refresh_token: token,
      });
      cookies.remove("refresh_token", {
        path: "/",
      });
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Head>
        <title>Cintal</title>
        <link rel="apple-touch-icon" href="/" type="image" sizes="any" />
        <link rel="icon" href="/cintal.png" type="image" sizes="any" />
        <link rel="icon" href="/" sizes="any" />
      </Head>

      {router.pathname !== "/" &&
        router.pathname !== "/signup" &&
        router.pathname !== "/login" && (
          <div className="bg-sky-700 px-3 py-3 flex items-center justify-between lg:flex hidden">
            <div className=" md:mx-4  ">
              <Link href="/">
                <img
                  src="/cintal.png"
                  width={95}
                  height={41}
                  alt="logo"
                  className="lg:w-[100px]"
                />
              </Link>
            </div>
            <button
              onClick={() => {
                handleLogout();
              }}
              className="text-white font-medium text-xl"
            >
              Logout
            </button>
          </div>
        )}

      {/*router.pathname !== "/" &&
        router.pathname !== "/signup" &&
        router.pathname !== "/login" && <Navbar />*/}

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ModalProvider>
            <Component {...pageProps} />
            <Modal />
          </ModalProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
