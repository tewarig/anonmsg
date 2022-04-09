import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Icon,
  Center,
  Fade,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Avatar, Wrap, WrapItem, Text } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import messageValues from "../../const";

import "react-toastify/dist/ReactToastify.css";

function Message() {
  const router = useRouter();
  const { userName } = router.query;
  const [userData, setUserData] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [hint, setHint] = useState<any>("");
  const [error, setError] = useState<boolean>(false);

  async function getUserData() {
    const { data, error } = await supabaseClient
      .from("userData")
      .select()
      .eq("userName", userName);
    console.log(data);
    if (data !== []) {
      setUserData(data?.[0]);
    } else {
      setUserData([]);
    }
  }

  useEffect(() => {
    if (router.isReady) {
      getUserData();
    }
  }, [userName]);
  const { width, height } = useWindowSize();

  async function Something() {
    if (message !== "") {
      const { data, error } = await supabaseClient
        .from("message")
        .insert([{ message: message, hint: hint, userName: userName?.[0] }]);
      console.log(data);
      console.log(error);

      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 6000);
      toast.success(messageValues.messageSendSucess);
      setMessage("");
      setHint("");
    } else {
      toast.error(messageValues.emptyBoxWarning);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 6000);
    }
  }

  if (userData === null) {
    return <React.Fragment>Loading...</React.Fragment>;
  }
  if (userData === []) {
    return <React.Fragment>Nothing Found</React.Fragment>;
  }
  return (
    <Box bg="#f5feff" w="100%" p={10} alignContent={"center"}>
      {showConfetti && <Confetti width={width} height={height} />}
      <Center>
        <Wrap align={"center"}>
          <WrapItem>
            <Avatar
              name={userData.userName}
              src={userData.userProfile}
              size={"2xl"}
            />
          </WrapItem>
        </Wrap>
      </Center>
      <Center>
        <h1>
          {" "}
          Send An Anonymous message to <b>{userData.userName}</b>{" "}
        </h1>
      </Center>
      <Center>
        <h2>
          {" "}
          <b> {userData.userName}</b> will never know 😉{" "}
        </h2>
      </Center>

      <Center>
        <Textarea
          placeholder={
            error
              ? "Please send your message here"
              : "Enter your  secret message here..."
          }
          size="xl"
          borderRadius={8}
          margin={5}
          padding={5}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          _placeholder={error ? { color: "red" } : { color: "grey" }}
        />
      </Center>
      <Center>
        <Input
          placeholder="Any Hint on who are you.. incase user wants to guess ?"
          borderRadius={8}
          margin={5}
          padding={5}
          value={hint}
          onChange={(e) => {
            setHint(e.target.value);
          }}
        />
      </Center>

      <Center>
        <Button
          colorScheme={"teal"}
          margin={5}
          borderRadius={8}
          onClick={Something}
        >
          Send <Icon as={ChevronRightIcon} w={6} h={6} />
        </Button>
      </Center>
      <ToastContainer />
    </Box>
  );
}

export default Message;
