import { useState } from "react";
import { Box, Flex, Text, IconButton, useToast } from "@chakra-ui/react";
import { ReactComponent as GoogleLogo } from "assets/img/icons/google-icon.svg";
import { useHistory } from "react-router-dom";
import { setAuth } from "service/authSlice";
import { FirebaseError } from "@firebase/util";
import { setUser } from "service/userSlice";
import { ReactComponent as FacebookLogo } from "assets/img/icons/facebook-icon.svg";
import ChoseRoleModal from "./modals/ChoseRoleModal";
import { useDispatch } from "react-redux";
import { getDatabase, ref, get, onValue } from "firebase/database";
import { User } from "types/user-types";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const SocialLogin = () => {
  const [userWithoutRole, setUserWithoutRole] = useState<User | null>(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

  type SocialLogin = "google" | "facebook";

  const socialLogin = async (type: SocialLogin) => {
    const provider =
      type === "google" ? new GoogleAuthProvider() : new FacebookAuthProvider();

    const db = getDatabase();
    const auth = getAuth();
    auth.languageCode = "it";

    try {
      const result = await signInWithPopup(auth, provider);
      const userRef = ref(db, "users/" + result.user.uid);
      const userCheck = await get(userRef);
      const { user } = result;

      dispatch(
        setAuth({
          token: (user as any).accessToken,
          refreshToken: user.refreshToken,
          id: user.uid,
        })
      );

      if (!userCheck.exists() && user.email && user.displayName) {
        const newUser = {
          id: user.uid,
          firstName: user.displayName?.split(" ")[0],
          lastName: user.displayName?.split(" ")[1],
          email: user.email,
        };

        await setUserWithoutRole(newUser);
        dispatch(setUser(newUser));
      } else {
        await onValue(userRef, (snapshot) => {
          dispatch(setUser(snapshot.val()));
        });
        history.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast({
          status: "error",
          description: error.message,
        });
      }
    }
  };

  return (
    <>
      <ChoseRoleModal
        user={userWithoutRole}
        onClose={() => setUserWithoutRole(null)}
      />
      <Box w="100%">
        <Flex w="100%" justifyContent="space-between" alignItems="center">
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
            as="button"
            onClick={() => socialLogin("google")}
          />
          <IconButton
            w="70px"
            boxShadow="0px 1px 4px rgba(0, 0, 0, 0.1)"
            colorScheme="white"
            _hover={{ bg: "grey.100" }}
            aria-label="facebook login"
            icon={<FacebookLogo />}
            fontWeight="normal"
            as="button"
            onClick={() => socialLogin("facebook")}
          />
        </Flex>
      </Box>
    </>
  );
};

export default SocialLogin;
