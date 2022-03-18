import {
  Box,
  Button,
  Image,
  Heading,
  Flex,
  Text,
  IconButton,
  VStack,
  useDisclosure,
  Tooltip,
  UnorderedList,
  ListItem,
  Icon,
  Link,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { omit } from "lodash";
import TextField from "components/common/inputs/TextField";
import bigLogoUrl from "assets/img/common/logo-big.png";
import { ReactComponent as InfoIcon } from "assets/img/icons/info.svg";
import { emailRegex } from "config/constants";
//   import ConfirmEmailModal from './modals/confirm-email-modal';
//   import useCompanyToken from './hooks/company-token';
//   import { useSocialLogin } from './hooks/use-social-login';
import { ReactComponent as GoogleLogo } from "assets/img/icons/google-icon.svg";
import { ReactComponent as FacebookLogo } from "assets/img/icons/facebook-icon.svg";
import signupImageUrl from "assets/img/sign-up.png";

const schema = () =>
  yup.object().shape({
    firstName: yup
      .string()
      .required("First Name is Required")
      .max(50, "signup:First Name is too long"),
    lastName: yup
      .string()
      .required("Last Name is Required")
      .max(50, "signup:Last Name is too long"),
    email: yup
      .string()
      .required("Email is required")
      .matches(emailRegex, "Not a valid email")
      .max(50, "signup:Email is too long"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(256, "Password is too long")
      .matches(
        /.*?[A-Z]/,
        "Password must have at least one uppercase character"
      )
      .matches(
        /.*?[a-z]/,
        "Password must have at least one lowercase character"
      )
      .matches(/.*?[0-9]/, "Password must have at least one number"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .min(8, "Password must be at least 8 characters")
      .max(256, "Password is too long")
      .test(
        "isSame",
        "Passwords don't match",
        (value, ctx) => value === ctx.parent.password
      ),
  });

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const form = useForm<SignUpForm>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema()),
    mode: "onChange",
  });
  return (
    <Box h="100vh" w="100%" bg="white">
      <Flex align="center" justify="center" h="100vh">
        <Image
          display={["none", "none", "none", "block", "block"]}
          src={signupImageUrl}
          alt="login image"
          h="100vh"
        />
        <Flex justifyContent="center" w="80%">
          <Box w="430px">
            <Heading as="h2" fontSize="2xl">
              Sign Up
            </Heading>

            <Text color="grey.300" mb="47px">
              Sign up and enjoy.
            </Text>

            <FormProvider {...form}>
              <VStack
                as="form"
                spacing={4}
                align="flex-start"
                onSubmit={form.handleSubmit(() => {})}
              >
                <TextField
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your First Name"
                  trim
                />
                <TextField name="lastName" label="Last Name" placeholder="Enter your Last Name" trim />
                <TextField name="email" label="Contact Email" placeholder="Enter your email" trim />

                <TextField
                  name="password"
                  placeholder="Enter your password"
                  label={
                    <>
                      Password{" "}
                      <Tooltip
                        placement="top"
                        hasArrow
                        label={
                          <>
                            Password must be:
                            <UnorderedList>
                              <ListItem>8 to 20 characters long</ListItem>
                              <ListItem>
                                Have at least one uppercase letter
                              </ListItem>
                              <ListItem>
                                Have at least one lowercase letter
                              </ListItem>
                              <ListItem>Have at least one number</ListItem>
                            </UnorderedList>
                          </>
                        }
                      >
                        <Icon color="grey.400" w={4} h={4} as={InfoIcon} />
                      </Tooltip>
                    </>
                  }
                  type="password"
                />
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                />
                <Link
                  as={RouterLink}
                  to="/login"
                  fontSize="md"
                  color="grey.300"
                  textDecoration="underline"
                  textAlign="right"
                  alignSelf="flex-end"
                >
                  Already have an account? Log In
                </Link>
                <Button
                w="100%"
                mb="30px"
                  type="submit"
                  disabled={
                    !form.formState.isValid}
                  //   disabled={
                  //     !form.formState.isValid || signupLoading || companyLoading
                  //   }
                  //   isLoading={signupLoading || companyLoading}
                  colorScheme="primary"
                  alignSelf="center"
                >
                  Submit
                </Button>
                
                <Flex
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box w="25%" h="1px" bgColor="grey.200" />
                  <Text
                    color="grey.400"
                    textAlign="center"
                    w="189px"
                    px="17px"
                    fontSize="xs"
                  >
                    Or do it via other accounts
                  </Text>
                  <Box w="25%" h="1px" bgColor="grey.200" />
                </Flex>

                <Flex pt="28px" w="100%" justifyContent="center">
                  <IconButton
                    w="70px"
                    colorScheme="white"
                    boxShadow="0px 1px 4px rgba(0, 0, 0, 0.1)"
                    icon={<GoogleLogo />}
                    aria-label="google login"
                    mr="20px"
                    _hover={{ bg: "grey.100" }}
                    fontWeight="normal"
                    as="a"
                    //   href={googleLink}
                    target="_self"
                  />

                  <IconButton
                    w="70px"
                    boxShadow="0px 1px 4px rgba(0, 0, 0, 0.1)"
                    colorScheme="white"
                    _hover={{ bg: "grey.100" }}
                    aria-label="facebook login"
                    icon={<FacebookLogo />}
                    fontWeight="normal"
                    as="a"
                    // href={appleLink}
                    target="_self"
                  />
                </Flex>


              </VStack>
            </FormProvider>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SignUp;
