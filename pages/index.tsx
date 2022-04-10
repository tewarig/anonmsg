import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Center,
  Divider,
  useMediaQuery,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import Router from "next/router";
import UserGraph from "./lottie/lf30_editor_tvgs26zl.json";
import socialMedia from "./lottie/socialMedia.json";
import think from "./lottie/think.json";

const LoginPage = () => {
  const { user, error } = useUser();
  const [data, setData] = useState({});
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");

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
        frames: [20],
      },
      {
        visibility: [0.2, 0.45],
        type: "seek",
        frames: [20, 85],
      },
      {
        visibility: [0.45, 1.0],
        type: "seek",
        frames: [85, 120],
      },
    ],
  };

  return (
    <React.Fragment>
      <Flex flexDirection={isLargerThan1000 ? "row" : "column"}>
        <Box
          width={isLargerThan1000 ? "50%" : "100%"}
          height={isLargerThan1000 ? "50%" : "100%"}
        >
          <Flex flexDirection={"column"} margin="5%" mt="30%">
            <Text fontSize={"2xl"}> Give and Receive </Text>

            <Text
              bgGradient="linear(to-l, #8000ff ,#8000f0)"
              bgClip="text"
              fontSize={isLargerThan1000 ? "8xl" : "3xl"}
            >
              {" "}
              Anonymous Feedbacks
            </Text>
          </Flex>
        </Box>
        <Box
          width={isLargerThan1000 ? "50%" : "100%"}
          height={isLargerThan1000 ? "50%" : "100%"}
        >
          <Lottie
            animationData={UserGraph}
            loop={false}
            autoPlay={false}
            width={isLargerThan1000 ? "50%" : "100%"}
            height={isLargerThan1000 ? "50%" : "100%"}
          />
        </Box>
      </Flex>
      <Divider height={1} />
      <Box bgGradient="linear(to-l, #8000ff ,#8000f0)">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Flex flexDirection={isLargerThan1000 ? "row" : "column"}>
          <Box
            width={isLargerThan1000 ? "50%" : "100%"}
            height={isLargerThan1000 ? "50%" : "100%"}
          >
            <Lottie
              animationData={socialMedia}
              loop={true}
              autoPlay={true}
              width="50%"
              height={"50%"}
            />
          </Box>
          <Box
            width={isLargerThan1000 ? "50%" : "100%"}
            height={isLargerThan1000 ? "50%" : "100%"}
          >
            <Flex
              flexDirection={"column"}
              margin={isLargerThan1000 ? "5%" : "0%"}
              mt="10%"
            >
              <Center>
                <Text fontSize={isLargerThan1000 ? "5xl" : "xl"} color="white">
                  {" "}
                  Say directly without hesitation anonymously.
                </Text>
              </Center>
              <br />
              <br />
              <Center>
                <Text
                  color="white"
                  fontSize={"xl"}
                  mt={isLargerThan1000 ? "5%" : "0%"}
                  margin="5px"
                >
                  {" "}
                  People tend to speak more openly when they are anonymously.
                  This way they don't get judged and the receiver get a true
                  feedback.
                </Text>
              </Center>
            </Flex>
          </Box>
        </Flex>
        <br />
        <br />
        <br />
        <br />
      </Box>
      <Box>
        <br />
        <br />
        <br />
        <br />
        <Flex>
          <Box
            width={isLargerThan1000 ? "50%" : "100%"}
            height={isLargerThan1000 ? "50%" : "100%"}
          >
            <Flex flexDirection={isLargerThan1000 ? "column" : "row"} margin="5%" mt="10%">
              <Text
                fontSize={isLargerThan1000 ? "5xl" : "xl"}
                mt="20%"
                ml="10%"
              >
                {" "}
                People tends to think more about feedback when it is without any
                name or label.
              </Text>
              <br />
              <br />
            </Flex>
          </Box>
          <Box
            width={isLargerThan1000 ? "50%" : "100%"}
            height={isLargerThan1000 ? "50%" : "100%"}
          >
            <Lottie
              animationData={think}
              loop={true}
              autoPlay={true}
              width="50%"
              height={"50%"}
            />
          </Box>
        </Flex>
      </Box>
    </React.Fragment>
  );
};

export default LoginPage;
