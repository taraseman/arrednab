import { Suspense } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import FullPageLoading from "components/loading/full-page-loading";
import { Router } from "react-router-dom";
import history from "utils/history";
import theme from "theme/theme";
import store from "service/store";
import Routes from "./routes";
import NetworkStatus from "./components/NetworkStatus";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={<FullPageLoading />}>
            <ToastContainer autoClose={3000} hideProgressBar />
            <NetworkStatus />
            <Routes />
          </Suspense>
        </Router>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
