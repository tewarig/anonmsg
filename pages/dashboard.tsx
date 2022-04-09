import React from "react";
import { Box, Center, Text, Divider } from "@chakra-ui/react";
import User from "./Comp/user";
import MessageBox from "./Comp/messageBox";
import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";

export default function Dashboard(props: IDashBoardProps) {
  const { user } = props;
  console.log("User");
  console.log(user);
  async function getData() {
    const { data, error } = await supabaseClient
      .from("message")
      .select()
      .eq("userName", "gt010");
  }
  getData();
  console.log(user);

  return (
    <Box bg="#f5feff" w="100%" p={10} alignContent={"center"}>
      <User
        fullName={user?.user_metadata?.full_name}
        userName={user?.user_metadata?.user_name}
        numberOfMessage={50}
        avatarImage={user?.user_metadata?.avatar_url}
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

interface IDashBoardProps {
  user: userProps;
}
interface userProps {
  id: string;
  email: string;
  providers: [string];
  user_metadata: {
    avatar_url: string;
    email: string;
    full_name: string;
    preferred_username: string;
    user_name: string;
  };
}
export const getServerSideProps = withAuthRequired();
