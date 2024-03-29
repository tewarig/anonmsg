import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Icon,
  Center,
  Fade,
  Spinner,
  useMediaQuery,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import { Avatar, Wrap, WrapItem, Text } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { ChevronRightIcon } from "@chakra-ui/icons";

import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import messageValues from "../../const";
import axios from "axios";
import Lottie from "lottie-react";
import Cat from "../../lottie/cat.json";

import "react-toastify/dist/ReactToastify.css";

function Message() {
  const router = useRouter();
  const { userName } = router.query;
  const [userData, setUserData] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [hint, setHint] = useState<any>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");

  const authKey = process.env.NEXT_PUBLIC_AUTH_KEY;

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

  function handlSubmit() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Something();
    }, 500);
  }

  async function Something() {
    if (message !== "") {
      const { data, error } = await supabaseClient
        .from("message")
        .insert([{ message: message, hint: hint, userName: userName?.[0] }]);

      setShowConfetti(true);

      axios({
        method: "post",
        url: "https://fcm.googleapis.com/fcm/send",
        headers: {
          "Content-Type": "application/json",
          Authorization: authKey,
        },
        data: {
          to: userData.userToken,
          notification: {
            body: "You have a new Message in Anon msg",
            title: "Some Messeged You",
            subtitle: "You have a new Message in Anon msg",
          },
        },
      });
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
    return (
      <React.Fragment>
        <Box padding="6" boxShadow="lg" bg="white">
          <Center>
            <SkeletonCircle size="10" />
          </Center>
          <Skeleton height="20px" mt="1%" />
          <Skeleton height="20px" mt="1%" />
          <Skeleton height="20px" mt="1%" />
          <Skeleton height="20px" mt="1%" />
          <Skeleton height="20px" mt="1%" />
        </Box>
      </React.Fragment>
    );
  }
  if (userData === [] || userData === undefined) {
    return (
      <React.Fragment>
        {" "}
        <Center>
          <Text> Opps! No user With such userName...</Text>
        </Center>
        <Center>
          <Box
            width={{
              md: "50%",
              lg: "25%",
            }}
            height={{
              md: "50%",
              lg: "25%",
            }}
          >
            <Lottie animationData={Cat} loop={true} autoPlay={true} />
          </Box>
        </Center>
      </React.Fragment>
    );
  }
  console.log(userData);
  return (
    <Box bg="#fdfaff" w="100%" p={10} alignContent={"center"}>
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
          height={isLargerThan1000 ? "240px" : "200px"}
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
          colorScheme={"purple"}
          margin={5}
          borderRadius={8}
          onClick={handlSubmit}
          disabled={loading}
        >
          {loading ? (
            <Spinner />
          ) : (
            <React.Fragment>
              Send <Icon as={ChevronRightIcon} w={6} h={6} />{" "}
            </React.Fragment>
          )}
        </Button>
      </Center>
      <br />
      <br />
      <br />
      <br />
      <br />
      <ToastContainer />
    </Box>
  );
}

export default Message;
