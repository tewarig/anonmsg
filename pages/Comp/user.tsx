import React from "react";
import {
  Box,
  Center,
  Wrap,
  WrapItem,
  Avatar,
  Text,
  Button,
} from "@chakra-ui/react";

function User(props: userProps) {
  const { fullName, avatarImage, numberOfMessage } = props;
  return (
    <React.Fragment>
      <Center>
        <Wrap align={"center"}>
          <WrapItem>
            <Box>
              {" "}
              <Avatar name={fullName} src={avatarImage} size={"2xl"} />
              <Text
                bgGradient="linear(to-l, #20bf55 ,#01baef)"
                bgClip="text"
                fontSize="large"
                ml="5%"
              >
                {fullName}
              </Text>
            </Box>
            <Box>
              <Button
                ml="-70%"
                borderRadius={80}
                colorScheme="teal"
                padding={1}
                zIndex={10}
                boxShadow="inner"
              >
                {numberOfMessage}
              </Button>
            </Box>{" "}
          </WrapItem>
        </Wrap>
      </Center>
    </React.Fragment>
  );
}
interface userProps {
  fullName?: string;
  avatarImage?: string;
  numberOfMessage: Number;
}

export default User;
