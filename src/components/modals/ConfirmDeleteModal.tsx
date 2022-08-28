import { useRef, useState } from "react";
import {
  Button,
  Flex,
  useToast,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { FirebaseError } from "@firebase/util";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deleteAction: () => Promise<unknown> | void;
  title: string;
  successMessage: string;
}

function ConfirmDeleteModal({
  isOpen,
  onClose,
  deleteAction,
  title,
  successMessage,
}: Props) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleDeleteAction = async () => {
    setIsLoading(true);
    try {
      await deleteAction();
      toast({
        status: "success",
        description: successMessage,
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError)
        toast({
          status: "error",
          description: error.message,
        });
    } finally {
      setIsLoading(false);
    }
    onClose();
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={!!isOpen}
      onClose={onClose}
      isCentered
      size="xl"
    >
      <AlertDialogOverlay />
      <AlertDialogContent p="32px">
        <AlertDialogHeader
          color="grey.600"
          fontWeight="500"
          fontSize="xl"
          pb="20px"
        >
          {title}
        </AlertDialogHeader>
        <Flex justify="space-between">
          <Button
            onClick={() => {
              onClose();
            }}
            variant="ghost"
            isDisabled={isLoading}
            fontWeight="500"
            bg="grey.100"
            w="120px"
            color="grey.400"
            ref={cancelRef}
          >
            Cancel
          </Button>

          <Button
            colorScheme="red"
            w="120px"
            ml="34px"
            type="submit"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={handleDeleteAction}
          >
            Delete
          </Button>
        </Flex>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmDeleteModal;
