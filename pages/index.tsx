import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Router from "next/router";
import UserGraph from "./lottie/lf30_editor_tvgs26zl.json";

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
  const interactivity = {
    mode: "scroll",
    actions: [
      {
        visibility: [0, 0.2],
        type: "stop",
        frames: [0],
      },
      {
        visibility: [0.2, 0.45],
        type: "seek",
        frames: [0, 45],
      },
      {
        visibility: [0.45, 1.0],
        type: "loop",
        frames: [45, 60],
      },
    ],
  };

  return (
    <React.Fragment>
      <Lottie animationData={UserGraph}  interactivity={interactivity} />
    </React.Fragment>
  );
};

export default LoginPage;
