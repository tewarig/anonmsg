import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import "./../style.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Nav from "./Comp/navbar";
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserProvider supabaseClient={supabaseClient}>
        <Nav/>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </UserProvider>
    </ChakraProvider>
  );
}
