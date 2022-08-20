import { Box, Center, Spinner } from '@chakra-ui/react';

interface Props {
  show?: boolean;
}

function FullPageLoading({ show = true }: Props) {
  return (
    <Box
      display={show ? 'block' : 'none'}
      position="fixed"
      top={0}
      left={0}
      zIndex={5}
      w="100vw"
      h="100vh"
      bg="rgba(0, 0, 0, 0.3)"
    >
      <Center h="100%">
        <Spinner w="120px" h="120px" />
      </Center>
    </Box>
  );
}

export default FullPageLoading;
