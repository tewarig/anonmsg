import React, { useState, useEffect } from "react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useAppSelector } from "./store";

export default function getUserName() {
  const [userName, setUserName] = useState<string>();
  const [error, setError] = useState<any>();
  const email = useAppSelector((state) => state.user.email);

  async function getUserName(email: any) {
    const { data, error } = await supabaseClient
      .from("userData")
      .select()
      .eq("email", email);
    let len = data?.length;
    console.log(len);
    if (len) {
      const userName = data[0]?.userName;
      setUserName(userName);
    } else {
      setUserName("");
    }
  }

  useEffect(() => {
    getUserName(email);
  }, [email]);
  return { userName, error };
}
