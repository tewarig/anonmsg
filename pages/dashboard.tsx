import React from "react";
import {
  Box,
  Center,
  Text,
  Divider,
  Button,
  Icon,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  Flex,
} from "@chakra-ui/react";
import User from "./Comp/user";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import { useAppSelector, useAppDispatch } from "./hooks/store";

import { getUser } from "./slices/userSlice";

import getMessage from "./hooks/getMessage";
import MessageDialog from "./Comp/messageDialog";
import getUserName from "./hooks/getUserName";
import { setUserName } from "./slices/userNameSlice";
import { LinkIcon, CopyIcon } from "@chakra-ui/icons";

export default function Dashboard() {
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { messageCount, data } = getMessage();
  const { userName } = getUserName();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL + "message/" + userName;

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
        onClick={onOpen}
      >
        {" "}
        <Icon as={LinkIcon} />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader backgroundColor={"#fdfaff"}>Share </DrawerHeader>

          <DrawerBody backgroundColor={"#fdfaff"}>
            Hello👋 , {userData.fullName} <br />
            Share this url with your friends , family or on Social Media to get
            Feedback and anomouse message.
            <Flex
              backgroundColor={"#f3e8fa"}
              borderRadius={10}
              padding={25}
              marginTop={5}
              justifyContent="space-between"
              flexDirection={"row"}
              onClick={onOpen}
            >
              <Center>
                {" "}
                {siteUrl.slice(0, 32)}...{" "}
                <Button colorScheme={"purple"} ml="2" >
                  {" "}
                  <Icon as={CopyIcon} />
                </Button>
              </Center>
            </Flex>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export const getServerSideProps = withAuthRequired();
