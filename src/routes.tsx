import { lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Flex, Box, useMediaQuery } from "@chakra-ui/react";
import Header from "components/header/Header";
import LeftMenu from "components/menu/Menu";

import PageLoading from "components/loading/page-loading";

const Login = lazy(() => import("pages/auth/LoginPage"));
const TermsPolicy = lazy(() => import("pages/TermsPolicy"));
const PasswordRecovery = lazy(() => import("pages/auth/PasswordRecovery"));
const Page404 = lazy(() => import("pages/Page404"));
const SignUp = lazy(() => import("pages/auth/SignupPage"));
const PageRoutes = lazy(() => import("./PageRoutes"));

function Routes() {
  const [isSmallScreen] = useMediaQuery('(max-width: 800px)');
  const location = useLocation();

 

  return (
      <Box>
        <Switch location={location}>
          <Route path="/error404">
            <Page404 />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/password-recovery" exact>
            <PasswordRecovery />
          </Route>

          <Route path="/terms-policy" exact>
            <TermsPolicy />
          </Route>

          <Route>
            <Flex justifyContent="space-between" w="100%">
              <LeftMenu />
                
                <Box pb={7}  w={isSmallScreen ? '100%': "calc(100% - 230px)"}>
                  <Header />
                  <Suspense fallback={<PageLoading />}>
                    <PageRoutes />
                  </Suspense>
                </Box>
            </Flex>
          </Route>
        </Switch>
      </Box>
  );
}

export default Routes;
