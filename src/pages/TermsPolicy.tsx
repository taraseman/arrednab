import {
  Box,
  Flex,
  OrderedList,
  ListItem,
  Button,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "assets/img/logo.svg";
import { PRIVACY_POLICY_ITEMS } from "config/constants";

const responsivePx = ['30px','80px','100px','160px'];

const TermsPolicy = () => {
  const history = useHistory();
  return (
    <Box>
      <Flex
        minH="154px"
        flexDirection="column"
        alignItems="center"
        pt="28px"
        pb="34px"
        px={responsivePx}
        bgColor="blue.600"
        color="white"
      >
        <Box w="100%" maxW="1069px">
          <Logo />
          <Text fontSize="2xl" fontWeight="700">
            Product legal information
          </Text>
        </Box>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="center"
        pt="46px"
        pb="34px"
        px={responsivePx}
      >
        <Box w="100%" maxW="1069px">
          <Text
            as="h1"
            mb="41px"
            fontSize="3xl"
            fontWeight="700"
            color="grey.500"
          >
            Privacy Policy
          </Text>
          <OrderedList>
            {PRIVACY_POLICY_ITEMS.map((privacyItem) => (
              <ListItem
                key={privacyItem.title}
                mb="22px"
                fontSize="xl"
                fontWeight="600"
              >
                {privacyItem.title}
                <Text mt="22px" fontWeight="400">
                  {privacyItem.description}
                </Text>
              </ListItem>
            ))}
          </OrderedList>
          <Button
            onClick={() => history.goBack()}
            variant="outline"
            w="108px"
            borderColor="rgba(111, 124, 139, 0.5)"
            color="grey.450"
          >
            Back
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default TermsPolicy;
