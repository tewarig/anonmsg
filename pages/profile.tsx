import react, { useState } from "react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import React from "react";
import { Button, Input } from "@chakra-ui/react";

export default function Profile() {
  const [userName, setUserName] = useState<string>();

  async function checkUserName() {
    if (userName !== "") {
      const { data, error } = await supabaseClient
        .from("userData")
        .select()
        .eq("userName", userName);
      if (data?.length === 0) {
        putValueInDataBase();
      } else {
        console.log("userName already exits");
      }
    }
  }
  async function putValueInDataBase() {
    const { data, error } = await supabaseClient.from("userData").insert([
      {
        userName: userName,
        userProfile: "https://avatars.githubusercontent.com/u/54894783?v=4",
        email: "tewarig0@gmail.com",
      },
    ]);
    console.log(data);
    console.log(error);
  }
  return (
    <React.Fragment>
      <Input
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      ></Input>
      <Button onClick={checkUserName}></Button>
    </React.Fragment>
  );
}
