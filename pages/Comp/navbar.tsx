import { ReactNode, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  Badge,
} from "@chakra-ui/react";
import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import Router from "next/router";
import { Divider } from "@supabase/ui";
import Lottie from "lottie-react";
import hello from "../../lottie/lf20_tvitrmm4.json";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, error } = useUser();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    async function loadData() {
      const { data: any } = await supabaseClient.from("test").select("*");
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);
  const logOut = () => {
    supabaseClient.auth.signOut();
    Router.push("/");
  };
  return (
    <>
      <Box bg={useColorModeValue("white", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Flex>
              <Text
                bgGradient="linear(to-l, #8000ff ,#8000f0)"
                bgClip="text"
                fontSize="xl"
              >
                {" "}
                AnonMsg <Badge borderRadius={"8%"}>Beta</Badge>
              </Text>
            </Flex>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {user && <Button onClick={() => logOut()}>Log Out</Button>}
              {!user && <Button onClick={onOpen}> Login </Button>}
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Divider colorScheme="purple" height={2} />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <Lottie
              animationData={hello}
              loop={false}
              autoPlay={false}
              width="50%"
              height={"50%"}
            />
            <Auth
              onlyThirdPartyProviders={true}
              supabaseClient={supabaseClient}
              providers={["google", "github"]}
              socialLayout="vertical"
              socialButtonSize="xlarge"
            />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
