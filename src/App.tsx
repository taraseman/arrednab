import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from './theme/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center">Taras</Box>
    </ChakraProvider>
  );
}

export default App;
