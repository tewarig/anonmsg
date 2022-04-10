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
import Link from "next/link";

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
              {fullName !== "" && (
                <Center>
                  <Text
                    bgGradient="linear(to-l,  #8000ff, #8000f0)"
                    bgClip="text"
                    fontSize="large"
                    ml="5%"
                  >
                    {fullName}
                  </Text>
                </Center>
              )}
            </Box>
            <Box>
              <Button
                ml="-70%"
                borderRadius={80}
                colorScheme="purple"
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
      <Center>
        {fullName === "" && (
          <Button mt="5" colorScheme={"purple"}>
            <Link href="/profile">
              <a>
                <Text> You Need to set a user Name First </Text>
              </a>
            </Link>
          </Button>
        )}
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
