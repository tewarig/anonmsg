import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useEffect, useState } from "react";
import Router from "next/router";

const LoginPage = () => {
  const { user, error } = useUser();
  const [data, setData] = useState({});

  useEffect(() => {
    async function loadData() {
      const { data: any } = await supabaseClient.from("test").select("*");
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) {
      Router.push("/dashboard");
    }
  }, [user]);

  if (!user) return <>{error && <p>{error.message}</p>}</>;

  return <></>;
};

export default LoginPage;
