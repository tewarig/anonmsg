import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Center, Divider } from "@chakra-ui/react";
import Lottie from "lottie-react";
import Router from "next/router";
import UserGraph from "./lottie/lf30_editor_tvgs26zl.json";
import socialMedia from "./lottie/socialMedia.json";
import think from "./lottie/think.json";

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
      <Flex>
        <Box width={"50%"} height={"50%"}>
          <Flex flexDirection={"column"} margin="5%" mt="30%">
            <Text fontSize={"2xl"}> Give and Receive </Text>

            <Text
              bgGradient="linear(to-l, #8000ff ,#8000f0)"
              bgClip="text"
              fontSize="8xl"
            >
              {" "}
              Anonymous Feedbacks
            </Text>
          </Flex>
        </Box>
        <Box width={"50%"} height={"50%"}>
          <Lottie
            animationData={UserGraph}
            loop={false}
            autoPlay={false}
            width="50%"
            height={"50%"}
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
        <Flex>
          <Box width="50%" height="50%">
            <Lottie
              animationData={socialMedia}
              loop={true}
              autoPlay={true}
              width="50%"
              height={"50%"}
            />
          </Box>
          <Box width={"50%"} height={"50%"}>
            <Flex flexDirection={"column"} margin="5%" mt="10%">
              <Text fontSize={"5xl"} color="white">
                {" "}
                Say directly without hesitation anonymously.
              </Text>
              <br />
              <br />
              <Text color="white" fontSize={"xl"} mt="5%">
                {" "}
                People tend to speak more openly when they are anonymously. This
                way they don't get judged and the receiver get a true feedback.
              </Text>
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
          <Box width={"50%"} height={"50%"}>
            <Flex flexDirection={"column"} margin="5%" mt="10%">
              <Text fontSize={"5xl"} mt="20%" ml="10%">
                {" "}
                People tends to think more about feedback when it is without any
                name or label.
              </Text>
              <br />
              <br />
            </Flex>
          </Box>
          <Box width="50%" height="50%">
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
