import { Divider, Center, Box } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Box width="100%">
        <Center mt="1%" margin="5px">
          @oyeTewari
        </Center>
      </Box>
    </React.Fragment>
  );
}

export default Footer;
