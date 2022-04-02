import { lazy, Suspense } from "react";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import { Flex, Box, Grid } from "@chakra-ui/react";
// import Header from 'components/header/header';
// import LeftMenu from 'components/menu/menu';
// import PageRoutes from 'page-routes';

import PageLoading from "components/loading/page-loading";

const Login = lazy(() => import("pages/auth/login"));
const PasswordRecovery = lazy(() => import("pages/auth/password-recovery"));
const Page404 = lazy(() => import("pages/Page404"));
const SignUp = lazy(() => import("./pages/auth/signup"));
const PageRoutes = lazy(() => import("./PageRoutes"));

// const SignUpCompany = lazy(() => import('pages/auth/signup-company'));

function Routes() {
  const topLevelPath = useRouteMatch<{ path: string }>("/:path")?.params.path;

  const location = useLocation();

  // hack to remount header on login/signup page so that it reloads user data when needed
  const headerKey =
    topLevelPath && ["login", "signup"].includes(topLevelPath)
      ? topLevelPath
      : "";

  return (
    <>
      {/* <Header key={headerKey} /> */}
      {/* 100% - header height */}
      <Box h="calc(100% - 3.5rem)">
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
          
          <Route>
            <Flex justifyContent="center" w="100%">
              <Grid
                templateColumns="max-content minmax(0, 1fr)"
                w={{ base: "90%", xl: "container.xl" }}
                gap={12}
                pt={9}
              >
                {/* <LeftMenu /> */}
                <Box pb={7} w="100%">
                  <Suspense fallback={<PageLoading />}>
                    <PageRoutes />
                  </Suspense>
                </Box>
              </Grid>
            </Flex>
          </Route>
        </Switch>
      </Box>
    </>
  );
}

export default Routes;
