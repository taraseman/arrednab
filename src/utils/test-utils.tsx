import React, { FC, ReactElement } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import theme from "theme/theme";
import store from "service/store";
import { render, RenderOptions } from "@testing-library/react";
import { Router } from "react-router-dom";
import history from "utils/history";

const AllTheProviders: FC<{ children: React.ReactNode | any }> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    </ChakraProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
