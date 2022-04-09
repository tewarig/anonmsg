import React, { useState, useEffect } from "react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import getUserName from "./getUserName";

export default function getMessage() {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>();
  const [messageCount, setMessageCount] = useState<number>(0);
  const { userName } = getUserName();

  async function getUserMessages(userName: string) {
    const { data, error } = await supabaseClient
      .from("message")
      .select()
      .eq("userName", userName);
    const receivedMessage = data ? data : [];
    setData(receivedMessage);
    const message = data ? data.length : 0;

    setMessageCount(message);
    if (error) {
      setData(error);
    }
  }
  useEffect(() => {
    getUserMessages(userName);
  }, [userName]);

  return { data, error, messageCount };
}
