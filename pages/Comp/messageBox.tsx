import React from "react";
import {
  Text,
  Icon,
  Flex,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

function MessageBox(props: MessageBoxProps) {
  const { message, messageHint } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <React.Fragment>
      <Flex
        backgroundColor={"#d7fcf4"}
        borderRadius={10}
        padding={25}
        marginTop={5}
        justifyContent="space-between"
        flexDirection={"row"}
        onClick={onOpen}
      >
        <Text>{message}</Text>
        <Icon as={ChevronRightIcon} w={6} h={6} />
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Message</DrawerHeader>

          <DrawerBody>
            <Flex
              backgroundColor={"#d7fcf4"}
              borderRadius={10}
              padding={25}
              marginTop={5}
              justifyContent="space-between"
              flexDirection={"row"}
              onClick={onOpen}
            >
              <Text>{message}</Text>
            </Flex>
            <br />
            <Text ml="5%">who messaged me this ?🤔</Text>
            <Flex
              backgroundColor={"#d7fcf4"}
              borderRadius={10}
              padding={25}
              marginTop={5}
              justifyContent="space-between"
              flexDirection={"row"}
              onClick={onOpen}
            >
              <Text>{message}</Text>
            </Flex>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}

interface MessageBoxProps {
  message: string;
  messageHint?: string;
}
export default MessageBox;
