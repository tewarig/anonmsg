import { Box, Button, Input, Textarea, Icon, Center } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useRouter } from "next/router";

import React from "react";

function Message() {
  const router = useRouter();
  const { userName } = router.query;

  async function Something() {
    const { data, error } = await supabaseClient
      .from("message")
      .insert([
        { message: "something", hint: "meow meow", userName: userName },
      ]);

    console.log(data);
    if (error) {
      console.log(error);
    }
  }
  // use router params here :)
  return (
    <Box bg="#f5feff" w="100%" p={10} alignContent={"center"}>
      <Center>
        <Wrap align={"center"}>
          <WrapItem>
            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              size={"2xl"}
            />
          </WrapItem>
        </Wrap>
      </Center>
      <Center>
        <h1>
          {" "}
          Send An Anonymous message to <b>{userName}</b>{" "}
        </h1>
      </Center>
      <Center>
        <h2>
          {" "}
          <b> {userName}</b> will never know 😉{" "}
        </h2>
      </Center>

      <Center>
        <Textarea
          placeholder="Enter your  secret message here..."
          size="xl"
          borderRadius={8}
          margin={5}
          padding={5}
        />
      </Center>
      <Center>
        <Input
          placeholder="Any Hint on who are you.. incase user wants to guess ?"
          borderRadius={8}
          margin={5}
          padding={5}
        />
      </Center>

      <Center>
        <Button
          colorScheme={"teal"}
          margin={5}
          borderRadius={8}
          onClick={Something}
        >
          Send <Icon as={ChevronRightIcon} w={6} h={6} />
        </Button>
      </Center>
    </Box>
  );
}

export default Message;
