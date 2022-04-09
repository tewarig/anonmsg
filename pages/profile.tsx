import React, { useState, useEffect } from "react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Button, Input, Text, Box } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "./hooks/store";
import Router from "next/router";
import getUserName from "./hooks/getUserName";

import messageValues from "../const";

export default function Profile() {
  const { userName } = getUserName();

  const [userNameInput, setUserNameInput] = useState<string>();
  const userProfile = useAppSelector((state) => state.user.avatarUrl);
  const userEmail = useAppSelector((state) => state.user.email);
  const notify = () => toast.error(messageValues.userNameTakenWarning);

  useEffect(() => {
    console.log(userName);
    if (userName) {
      Router.push("/dashboard");
    }
  }, [userName]);
  async function checkUserName() {
    if (userNameInput !== "") {
      const { data, error } = await supabaseClient
        .from("userData")
        .select()
        .eq("userName", userNameInput);
      console.log(data);
      if (data?.length === 0) {
        putValueInDataBase();
      } else {
        notify();
      }
    } else {
      toast.error(messageValues.userNameEmptyWarning);
    }
  }
  async function putValueInDataBase() {
    const { data, error } = await supabaseClient.from("userData").insert([
      {
        userName: userNameInput,
        userProfile: userProfile,
        email: userEmail,
      },
    ]);
    toast.success(messageValues.userNameSucessWarning);
    setTimeout(() => {
      Router.push("/dashboard");
    }, 2000);
  }
  // TODO: improve loding and not found
  return (
    <React.Fragment>
      <Box margin={"5%"}>
        <Text>{userName}</Text>
        <br />
        <Text> Please Choose a valid user Name </Text>
        <br />
        <Input
          value={userNameInput}
          onChange={(e) => {
            setUserNameInput(e.target.value);
          }}
        ></Input>
        <Button onClick={checkUserName} marginLeft={"1%"} marginTop={"5%"}>
          {" "}
          Submit
        </Button>
      </Box>
      <ToastContainer />
    </React.Fragment>
  );
}
