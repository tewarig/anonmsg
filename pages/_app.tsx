import { useEffect, useState } from "react";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import router, { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./Comp/navbar";
import { fetchToken, onMessageListener } from "./lib/firebase";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Comp/footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/firebase-messaging-sw.js").then(
          function (registration) {},
          function (err) {}
        );
      });
    }
  }, []);

  onMessageListener().then(() => {
    const notify = () => toast("You have got some new Messages ");
    notify();
    setTimeout(() => {
      router.reload();
    }, 2000);
  });

  fetchToken(setTokenFound);

  return (
    <ChakraProvider>
      <UserProvider supabaseClient={supabaseClient}>
        <Nav />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        <Footer />
      </UserProvider>
      <ToastContainer />
    </ChakraProvider>
  );
}
