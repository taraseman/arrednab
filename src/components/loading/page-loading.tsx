import { useEffect, useState } from "react";
import { Box, Skeleton, Heading, SkeletonText } from "@chakra-ui/react";

interface Props {
  show?: boolean;
}

function PageLoading({ show = true }: Props) {
  const [wait, setWait] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setWait(false);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, []);

  return wait ? null : (
    <Box display={show ? "block" : "none"}>
      <Skeleton width="max(200px, 30%)">
        <Heading as="h2" mb={6}>
          Loading...
        </Heading>
      </Skeleton>
      <SkeletonText mb={6} />
      <Skeleton width="max(400px, 60%)" height="400px" />
    </Box>
  );
}

export default PageLoading;
