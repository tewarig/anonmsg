import React from "react";
import getMessage from "../../hooks/getMessage";
import MessageBox from "./messageBox";
import Lottie from "lottie-react";
import Cat from "../../lottie/cat.json";
import { Box, Center, Text } from "@chakra-ui/react";

function MessageDialog() {
  const { data, error } = getMessage();

  if (data.length === 0) {
    return (
      <React.Fragment>
        <Center>
          <Text>
            {" "}
            You Don't have any Message Click on the Link Button get your url and
            share it.
          </Text>
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

  return (
    <React.Fragment>
      {data.map((message, index) => (
        <MessageBox
          key={index}
          message={message.message}
          messageHint={message.hint}
        />
      ))}
    </React.Fragment>
  );
}

export default MessageDialog;
