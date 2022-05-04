import {
  Flex,
  Box,
  Avatar,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import DefaultAvatarSrc from "assets/img/default-profile-icon.png";
import { ReactComponent as ChevronDown } from "assets/img/icons/chevron-down.svg";
import { useAppSelector } from "hooks/redux";
import EditUserModal from "components/modals/edit-user-modal/EditUserModal";
import { resetAuth } from "service/auth/authSlice";
import { useEffect } from "react";
import { Article } from "types/article-types";
import { getDatabase, ref, onValue } from "firebase/database";
import { setArticles } from "service/articlesSlice";
import { setUsers } from "service/allUsersSlice";
import { useAppDispatch } from "hooks/redux";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

const Header = () => {
  const dispatch = useAppDispatch();
  const editUserModalDisclosure = useDisclosure();

  const user = useAppSelector((state) => state.user.user);

  const getArticles = async () => {
    
    const db = getDatabase();
    const dbRef = ref(db, "articles");

    await onValue(dbRef, (snapshot) => {
      if (snapshot.val() !== null) {
        dispatch(
          setArticles(Object.values(snapshot.val()).reverse() as Article[])
        );
      }
    });

    
  };
  const getUsers = async () => {
    const db = getDatabase();
    const dbRef = ref(db, "users");

    await onValue(dbRef, (snapshot) => {
      if (snapshot.val()) {
        dispatch(setUsers(snapshot.val()));
      }
    });
  };

  useEffect(() => {
    getArticles();
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, function (user) {
      if (user) {
        // User is signed in.
      } else {
        dispatch(resetAuth());
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <EditUserModal
        isOpen={editUserModalDisclosure.isOpen}
        onClose={editUserModalDisclosure.onClose}
      />
      <Flex
        justify="flex-end"
        px="34px"
        h="74px"
        bgColor="white"
        alignItems="center"
        border="0.7px solid"
        borderColor="grey.150"
        borderLeft="0"
      >
        <Box>
          
          <Avatar
            mr="15px"
            src={user?.photoUrl ? user.photoUrl : DefaultAvatarSrc}
            sx={{ width: '48px', height: '48px', cursor: "pointer" }}
          />

        </Box>
        {user && (
          <Menu>
            <MenuButton
              as={Button}
              variant="link"
              rightIcon={<ChevronDown />}
              _hover={{ color: "primary.500" }}
            >
              {user.firstName} {user.lastName}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={editUserModalDisclosure.onOpen}>Edit</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </>
  );
};

export default Header;
