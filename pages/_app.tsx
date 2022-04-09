import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import "./../style.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserProvider supabaseClient={supabaseClient}>
          <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
}
