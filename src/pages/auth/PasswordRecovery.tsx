import {
  Box,
  Flex,
  Button,
  Image,
  Heading,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "@firebase/util";
import TextField from "components/common/inputs/TextField";
import loginImageUrl from "assets/img/password-recovery.png";
import { EMAIL_REGEX } from "config/constants";
import * as yup from "yup";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

interface RecoveryPasswordForm {
  email: string;
}
const schema = () =>
  yup.object().shape({
    email: yup
      .string()
      .matches(EMAIL_REGEX, "Not a valid email")
      .max(50, "login:Email is too long"),
  });

const PasswordRecovery = () => {
  const history = useHistory();
  const toast = useToast();
  const [isRecoveryMessageSending, setIsRecoveryMessageSending] =
    useState<boolean>(false);

  const onSubmit = async ({ email }: RecoveryPasswordForm) => {
    const auth = getAuth();
    setIsRecoveryMessageSending(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        status: "success",
        description: "Email was send to your email address",
      });
      history.push("/login");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast({
          status: "error",
          description: error.message,
        });
      }
      form.setValue("email", "");
    }
    setIsRecoveryMessageSending(false);
  };

  const form = useForm<RecoveryPasswordForm>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema()),
    mode: "onChange",
  });

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
              Password recovery
            </Heading>

            <Text color="grey.300" mb="47px">
              Enter the email you're using for your account.
            </Text>

            <FormProvider {...form}>
              <Flex
                as="form"
                onSubmit={form.handleSubmit(onSubmit)}
                flexDirection="column"
                alignItems="center"
              >
                <TextField
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                />

                <Button
                  w="100%"
                  mt="25px"
                  mb="30px"
                  type="submit"
                  disabled={!form.formState.isValid || isRecoveryMessageSending}
                  colorScheme="primary"
                  px={20}
                  isLoading={isRecoveryMessageSending}
                >
                  Reset
                </Button>

                <Link
                  as={RouterLink}
                  to="/login"
                  textAlign="right"
                  fontSize="md"
                  color="blue.500"
                  fontWeight="500"
                >
                  Back to Login
                </Link>
              </Flex>
            </FormProvider>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PasswordRecovery;
