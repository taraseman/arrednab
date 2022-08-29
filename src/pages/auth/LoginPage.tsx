import { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Button,
  HStack,
  Image,
  Heading,
  Text,
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
import { EMAIL_REGEX } from "config/constants";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setAuth } from "service/authSlice";
import { setUser } from "service/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import ChoseRoleModal from "./modals/ChoseRoleModal";
import { User } from "types/user-types";
import SocialLogin from "./SocialLogin";

interface LoginForm {
  email: string;
  password: string;
}
const schema = () =>
  yup.object().shape({
    email: yup
      .string()
      .matches(EMAIL_REGEX, "Not a valid email")
      .max(50, "login:Email is too long"),
    password: yup.string().required("Required for login"),
  });

const Login = () => {
  const [userWithoutRole, setUserWithoutRole] = useState<User | null>(
    null
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

  const onSubmit = async ({ email, password }: LoginForm) => {
    setIsUserLoading(true);

    const db = getDatabase();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        ({ user }) => {
          dispatch(
            setAuth({
              token: (user as any).accessToken,
              refreshToken: user.refreshToken,
              id: user.uid,
            })
          );

          const currentUserRef = ref(db, "users/" + user.uid);
          onValue(currentUserRef, (snapshot) => {
            dispatch(setUser(snapshot.val()));
          });

          toast({
            status: "success",
            description: "User logged successfully",
          });
          history.push("/");
        }
      );
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
      <ChoseRoleModal
        user={userWithoutRole}
        onClose={() => setUserWithoutRole(null)}
      />
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
                    Forgot your Password
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
                <SocialLogin />
              </VStack>
            </FormProvider>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Login;