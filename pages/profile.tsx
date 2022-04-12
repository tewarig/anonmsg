import React, { useState, useEffect } from "react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Button, Input, Text, Box } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../hooks/store";
import Router from "next/router";
import getUserName from "../hooks/getUserName";

import messageValues from "../const";
import NoSSR from "./Comp/noSSR";

export default function Profile() {
  const { userName } = getUserName();
  const userData = useAppSelector((state) => state.user);

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
  useEffect(() => {
    if (userData === {}) {
      Router.push("/");
    }
  }, [userData]);

  function getUserToken() {
    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("userToken")) || " ";

      return token;
    }
  }

  async function checkUserName() {
    if (userNameInput !== "") {
      const { data, error } = await supabaseClient
        .from("userData")
        .select()
        .eq("userName", userNameInput);
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
        userToken: getUserToken() ?? "",
      },
    ]);
    if (error) {
      toast.error(error);
      return;
    }

    toast.success(messageValues.userNameSucessWarning);
    setTimeout(() => {
      Router.push("/dashboard");
    }, 2000);
  }
  return (
    <NoSSR>
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
    </NoSSR>
  );
}
