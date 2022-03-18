import { Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Page404 = () => {
  const history = useHistory();

  return (
    <Flex
      h="calc(100vh - 56px)"
      alignItems="center"
      flexDirection="column"
      pt="100px"
    >
      <Heading fontSize="160px" fontWeight="100">
        404
      </Heading>
      <Text fontSize="20px" fontWeight="400" mb="2">
        Ooops!!
      </Text>
      <Text mb="6" textTransform="uppercase">
        This page doesn't exist or is unavailable
      </Text>
      <Button
        colorScheme="primary"
        w="220px"
        h="50px"
        fontWeight="100"
        onClick={() => {
          history.replace("/");
        }}
      >
        Go Back to Home
      </Button>
    </Flex>
  );
};

export default Page404;
