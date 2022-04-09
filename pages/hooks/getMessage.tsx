import React, { useState, useEffect } from "react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useAppSelector } from "./store";

export default function getMessage() {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>();
  const [messageCount, setMessageCount] = useState<number>(0);
  const userName = "gt010";
  async function getUserMessages(userName: string) {
    const { data, error } = await supabaseClient
      .from("message")
      .select()
      .eq("userName", userName);

    setData(data);
    const message = data ? data.length : 0;

    setMessageCount(message);
    if (error) {
      setData(error);
    }
  }
  useEffect(() => {
    getUserMessages(userName);
  }, []);

  return { data, error, messageCount };
}
