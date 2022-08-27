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
import { resetAuth } from "service/authSlice";
import { useEffect } from "react";
import { useAppDispatch } from "hooks/redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import getArticles from "service/get-data-fanctions/get-articles";
import Weather from "components/Weather";

const Header = () => {
  const dispatch = useAppDispatch();
  const editUserModalDisclosure = useDisclosure();

  const user = useAppSelector((state) => state.user.user);
  const users = useAppSelector((state) => state.users.users);

  useEffect(() => {
    getArticles(dispatch);
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
        justify="space-between"
        px="34px"
        h="74px"
        bgColor="white"
        alignItems="center"
        border="0.7px solid"
        borderColor="grey.150"
        borderLeft="0"
      >
        <Weather />
        <Flex alignItems="center">
          <Box>
            {user && users && (
              <Avatar
                mr="15px"
                src={
                  users[user?.id]?.photoUrl
                    ? users[user?.id]?.photoUrl
                    : DefaultAvatarSrc
                }
                sx={{ width: "48px", height: "48px", cursor: "pointer" }}
              />
            )}
          </Box>

          {user && users && (
            <Menu>
              <MenuButton
                as={Button}
                variant="link"
                rightIcon={<ChevronDown />}
                _hover={{ color: "primary.500" }}
                data-testid="menu-button-header"
              >
                {users[user?.id].firstName} {users[user?.id].lastName}
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={editUserModalDisclosure.onOpen}
                  data-testid="menu-button-edit-option"
                >
                  Edit
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
