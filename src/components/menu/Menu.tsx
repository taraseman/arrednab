import {
  Box,
  List,
  ListItem,
  ListIcon,
  Button,
  Text,
  Flex,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { ReactComponent as DashboardIcon } from "assets/img/icons/dashboard.svg";
import { ReactComponent as SettingsIcon } from "assets/img/icons/settings.svg";
import { ReactComponent as LogoutIcon } from "assets/img/icons/logout.svg";
import { resetAuth } from "service/auth/authSlice";
import { useHistory } from "react-router";
import { useAppDispatch } from "hooks/redux";
import { ReactComponent as Logo } from "assets/img/logo.svg";
import { ReactComponent as ArrowRight } from "assets/img/icons/arrow-right.svg";
import { useState } from "react";

interface IMenuItem {
  path: string;
  name: string;
  icon: React.ReactNode;
}

const items: IMenuItem[] = [
  {
    path: "/",
    name: "Dashboard",
    icon: DashboardIcon,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: DashboardIcon,
  },
];

const MenuItemWrapper = styled(Box)`
  padding: var(--chakra-space-1) var(--chakra-space-7);
  display: flex;
  margin-bottom: 10px;

  width: 100%;
  white-space: nowrap;
  color: var(--chakra-colors-grey-300);
  transition: background 0.2s, color 0.2s;
  &.active {
    color: var(--chakra-colors-primary-700);
    border-left: 2px solid var(--chakra-colors-primary-700);
    svg path {
      fill: var(--chakra-colors-primary-700);
    }
  }
  &:not(.active):hover {
    background: rgba(172, 177, 176, 0.2);
  }
  svg path {
    fill: var(--chakra-colors-grey-300);
    transition: fill 0.2s;
  }
`;

interface MenuLinkProps {
  to: string;
  linkText: React.ReactNode;
  icon: any; // TODO: proper icon type;
}

function MenuLink({ to, linkText, icon }: MenuLinkProps) {
  return (
    <ListItem fontSize="md" fontWeight="500">
      <MenuItemWrapper as={NavLink} to={to} exact={to === "/"}>
        {icon && (
          <ListIcon
            as={icon}
            verticalAlign="middle"
            mr="18px"
            h="1.25rem"
            w="1.25rem"
          />
        )}
        {linkText}
      </MenuItemWrapper>
    </ListItem>
  );
}

function LeftMenu() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isMenuCollupsed, setIsMenuCollupsed] = useState(true);
  const [isSmallScreen] = useMediaQuery("(max-width: 800px)");

  const logout = () => {
    dispatch(resetAuth());
    sessionStorage.clear();
    history.push("/login");
  };

  return (
    <Box
      as="aside"
      w="230px"
      h={isSmallScreen && isMenuCollupsed ? "74px" : "100vh"}
      position={isSmallScreen ? "absolute" : "sticky"}
      zIndex="100"
      top="0"
      border="0.5px solid var(--chakra-colors-grey-150)"
      borderTop="0"
      bgColor="white"
    >
      <Box>
        <Flex
          mb="22px"
          alignItems="center"
          h="74px"
          pl="34px"
          borderBottom="0.5px solid"
          borderColor="grey.150"
        >
          <Logo />
          {isSmallScreen && (
            <IconButton
              bgColor="grey.100"
              transition="transform 1s"
              transform={
                isMenuCollupsed ? "rotate(-360deg)" : "rotate(-180deg)"
              }
              icon={<ArrowRight />}
              aria-label="f"
              onClick={() => setIsMenuCollupsed((prevValue) => !prevValue)}
            />
          )}
        </Flex>
        <Box opacity={isSmallScreen && isMenuCollupsed ? "0" : "1"}>
          <Text mb="20px" px="34px" color="#6F7C8B80" fontWeight="500">
            Main Menu
          </Text>
          <List>
            {items.map((item) => (
              <MenuLink
                to={item.path}
                icon={item.icon}
                linkText={item.name}
                key={item.path}
              />
            ))}
          </List>
          <Box
            mt="23px"
            mx="21px"
            pt="27px"
            borderTop="1px solid"
            borderColor="grey.200"
          >
            <Button
              onClick={logout}
              leftIcon={<LogoutIcon />}
              w="100%"
              bgColor="grey.100"
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LeftMenu;
