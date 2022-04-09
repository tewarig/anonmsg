import React from "react";
import { Box, Center, Text, Divider } from "@chakra-ui/react";
import User from "./Comp/user";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import { useAppSelector, useAppDispatch } from "./hooks/store";

import { getUser } from "./slices/userSlice";

import getMessage from "./hooks/getMessage";
import MessageDialog from "./Comp/messageDialog";
import getUserName from "./hooks/getUserName";
import { setUserName } from "./slices/userNameSlice";

export default function Dashboard() {
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { messageCount, data } = getMessage();
  const { userName } = getUserName();

  dispatch(getUser());
  dispatch(setUserName());

  return (
    <Box bg="#f5feff" w="100%" p={10} alignContent={"center"}>
      <User
        fullName={userName}
        numberOfMessage={messageCount}
        avatarImage={userData.avatarUrl}
      />

      <br />
      <br />
      <Center>
        <Text
          bgGradient="linear(to-l, #20bf55 ,#01baef)"
          bgClip="text"
          fontSize="xxx-large"
        >
          Messages
        </Text>
      </Center>
      <Divider bgGradient="linear(to-l, #20bf55 ,#01baef)" />
      <br />
      <MessageDialog />
    </Box>
  );
}

export const getServerSideProps = withAuthRequired();
