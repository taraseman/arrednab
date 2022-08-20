import {
  Box,
  Button,
  Image,
  Heading,
  Flex,
  Text,
  VStack,
  useToast,
  Tooltip,
  UnorderedList,
  ListItem,
  Icon,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { FirebaseError } from "@firebase/util";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import TextField from "components/common/inputs/TextField";
import SelectField from "components/common/inputs/SelectField";
import { ReactComponent as InfoIcon } from "assets/img/icons/info.svg";
import { EMAIL_REGEX } from "config/constants";
import signupImageUrl from "assets/img/sign-up.png";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import SocialLogin from "./SocialLogin";
import setDataBaseData from "service/firebase-service/set-database-data";
import { User, UserRole } from "types/user-types";

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
      .matches(EMAIL_REGEX, "Not a valid email")
      .max(50, "signup:Email is too long"),
    role: yup.string().required("Position is Required"),
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
  role: UserRole;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const history = useHistory();
  const toast = useToast();
  const [isTermsPolicyAgreed, setIsTermsPolicyAgreed] =
    useState<boolean>(false);
  const [isUserCreating, setIsUserCreating] = useState<boolean>(false);

  const form = useForm<SignUpForm>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema()),
    mode: "onChange",
  });

  const onSubmit = async (values: SignUpForm) => {
    setIsUserCreating(true);
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = auth.currentUser;

      if (user) {
        await setDataBaseData<User>(
          {
            id: user.uid,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            role: values.role,
          },
          "users/" + user.uid
        );
      }

      toast({
        status: "success",
        description: "User registered successfully",
      });

      history.push("/login");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast({
          status: "error",
          description: error.message,
        });
      }
    }

    setIsUserCreating(false);
  };

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

            <Text color="grey.300" mb="30px">
              Sign up and enjoy.
            </Text>

            <FormProvider {...form}>
              <VStack
                as="form"
                spacing={4}
                align="flex-start"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <TextField
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your First Name"
                  trim
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your Last Name"
                  trim
                />
                <TextField
                  name="email"
                  label="Contact Email"
                  placeholder="Enter your email"
                  trim
                />

                <SelectField
                  data-testid="select-role"
                  name="role"
                  label="Position in Journalism"
                  placeholder="Chose your position"
                >
                  <option value="nUser">
                    Novice Journalist | Looking for a job or want to improve my
                    skills and get feedback from professionals
                  </option>
                  <option value="pUser">
                    Professional Journalist | Looking for employee or
                    interesting people
                  </option>
                </SelectField>

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
                <Flex fontSize="md" alignItems="center">
                  <Checkbox
                    data-testid="signup-checkbox"
                    mr="2"
                    isChecked={isTermsPolicyAgreed}
                    onChange={(e) => setIsTermsPolicyAgreed(e.target.checked)}
                  />
                  I agree to Product
                  <Link
                    ml="1"
                    as={RouterLink}
                    to="/terms-policy"
                    textAlign="right"
                    fontSize="md"
                    color="blue.500"
                    fontWeight="500"
                  >
                    Terms and Policy
                  </Link>
                </Flex>
                <Button
                  w="100%"
                  mb="30px"
                  type="submit"
                  disabled={
                    !form.formState.isValid ||
                    !isTermsPolicyAgreed ||
                    isUserCreating
                  }
                  isLoading={isUserCreating}
                  colorScheme="primary"
                  alignSelf="center"
                >
                  Get started now
                </Button>

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
                <SocialLogin />
              </VStack>
            </FormProvider>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SignUp;
