import { Suspense } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import FullPageLoading from 'components/loading/full-page-loading';
import { Router } from "react-router-dom";
import history from "utils/history";
import theme from "theme/theme";
import store from "service/store";
import Routes from "./routes";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Router history={history}>
        <Suspense fallback={<FullPageLoading />}>
          <Routes />
          </Suspense>
        </Router>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
