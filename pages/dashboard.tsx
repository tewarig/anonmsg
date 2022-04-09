import React from "react";
import { Box, Center, Text, Divider } from "@chakra-ui/react";
import User from "./Comp/user";
import MessageBox from "./Comp/messageBox";
import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useAppSelector, useAppDispatch } from "./hooks/store";
import { getUser } from "./context/userSlice";

export default function Dashboard() {
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  dispatch(getUser());

  async function getData() {
    const { data, error } = await supabaseClient
      .from("message")
      .select()
      .eq("userName", "gt010");
    console.log(data);
    getUserName();
  }
  getData();

  async function getUserName() {
    const { data, error } = await supabaseClient
      .from("userData")
      .select()
      .eq("email", "tewarig0@gmail.com");
  }

  return (
    <Box bg="#f5feff" w="100%" p={10} alignContent={"center"}>
      <User
        fullName={userData.fullName}
        numberOfMessage={50}
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
      <MessageBox message="Something Something" />
      <MessageBox message="Something Something" />
      <MessageBox message="Mew  meow meowwww meowwwww sdj slkdsd jsvdsv dsjsdvsdv sjsdvsd vjsd sdjdsn sdvjsdvn sdjvsd vksd vsd vsdv sdvs dv vs s " />
    </Box>
  );
}

export const getServerSideProps = withAuthRequired();
