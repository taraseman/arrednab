import { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Button,
  HStack,
  Image,
  Heading,
  Text,
  IconButton,
  VStack,
  Link,
  useToast,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FirebaseError } from "@firebase/util";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "components/common/inputs/TextField";
import loginImageUrl from "assets/img/login.png";
import { emailRegex } from "config/constants";
import * as yup from "yup";
import { ReactComponent as GoogleLogo } from "assets/img/icons/google-icon.svg";
import { ReactComponent as FacebookLogo } from "assets/img/icons/facebook-icon.svg";
import { useDispatch } from "react-redux";
import { setAuth } from "service/auth/authSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";

interface LoginForm {
  email: string;
  password: string;
}
const schema = () =>
  yup.object().shape({
    email: yup
      .string()
      .matches(emailRegex, "Not a valid email")
      .max(50, "login:Email is too long"),
    password: yup.string().required("Required for login"),
  });

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

  const onSubmit = async ({ email, password }: LoginForm) => {
    setIsUserLoading(true);

    const db = getDatabase();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
        dispatch(
          setAuth({
            token: user.accessToken,
            refreshToken: user.refreshToken,
            id: user.uid,
          })
        );

        update(ref(db, "users/" + user.uid), {
          lastLogin: Date.now(),
        });
        toast({
          status: "success",
          description: "User logged successfully",
        });
        history.push("/");
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast({
          status: "error",
          description: error.message,
        });
        form.setValue("password", "");
      }
    }

    setIsUserLoading(false);
  };

  const form = useForm<LoginForm>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema()),
    mode: "onChange",
  });

  const firstMount = useRef<boolean>(true);

  useEffect(() => {
    // hack to validate autofill values
    if (!firstMount.current) {
      return;
    } else {
      firstMount.current = false;
    }
    setTimeout(() => form.reset({}, { keepValues: true }), 0);
  }, [form]);

  return (
    <Box h="100vh" w="100%" bg="white">
      <Flex align="center" justify="center" h="100vh">
        <Image
          display={["none", "none", "none", "block", "block"]}
          src={loginImageUrl}
          alt="login image"
          h="100vh"
        />
        <Flex justifyContent="center" w="80%">
          <Box w="430px">
            <Heading as="h2" fontSize="2xl">
              Welcome back
            </Heading>

            <Text color="grey.300" mb="47px">
              Sign in to manage your account.
            </Text>

            <FormProvider {...form}>
              <VStack
                as="form"
                spacing={4}
                align="flex-start"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <TextField
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />
                <HStack justify="space-between" alignSelf="stretch">
                  <Link
                    as={RouterLink}
                    to="/password-recovery"
                    fontSize="md"
                    color="grey.300"
                    textDecoration="underline"
                  >
                    Forgot Password
                  </Link>
                  <Link
                    as={RouterLink}
                    to="/signup"
                    fontSize="md"
                    color="grey.300"
                    textDecoration="underline"
                    textAlign="right"
                  >
                    Don't have an account? Sign Up
                  </Link>
                </HStack>
                <Button
                  w="100%"
                  mb="30px"
                  type="submit"
                  disabled={!form.formState.isValid || isUserLoading}
                  colorScheme="primary"
                  px={20}
                  isLoading={isUserLoading}
                >
                  Sign In
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

export default Login;
