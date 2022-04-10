import React from "react";
import { Box, Center, Text, Divider, Button, Icon } from "@chakra-ui/react";
import User from "./Comp/user";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import { useAppSelector, useAppDispatch } from "./hooks/store";

import { getUser } from "./slices/userSlice";

import getMessage from "./hooks/getMessage";
import MessageDialog from "./Comp/messageDialog";
import getUserName from "./hooks/getUserName";
import { setUserName } from "./slices/userNameSlice";
import { LinkIcon } from "@chakra-ui/icons";

export default function Dashboard() {
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { messageCount, data } = getMessage();
  const { userName } = getUserName();

  dispatch(getUser());
  dispatch(setUserName());

  return (
    <Box bg="#fdfaff" w="100%" height={"100%"} p={10} alignContent={"center"}>
      <User
        fullName={userName}
        numberOfMessage={messageCount}
        avatarImage={userData.avatarUrl}
      />

      <br />
      <br />
      <Center>
        <Text
          bgGradient="linear(to-l,  #8000ff ,#8000f0)"
          bgClip="text"
          fontSize="2xl"
        >
          Messages
        </Text>
      </Center>
      <Divider bgGradient="linear(to-l,  #8000ff , #8000f0)" />
      <br />
      <MessageDialog />
      <Button
        colorScheme={"purple"}
        variant="outline"
        position={"fixed"}
        bottom="5px"
        right="5px"
        borderRadius="5px"
      >
        {" "}
        <Icon as={LinkIcon} />
      </Button>
    </Box>
  );
}

export const getServerSideProps = withAuthRequired();
