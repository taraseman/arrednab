import {
  Button,
  Flex,
  useToast,
  Avatar,
  Text,
  Box,
  VisuallyHidden,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import DefaultAvatarSrc from "assets/img/default-profile-icon.png";
import { useAppSelector } from "hooks/redux";
import { setUser } from "service/userSlice";
import { FirebaseError } from "@firebase/util";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import uploadFile from "service/firebase-service/upload-file";
import updateDataBaseData from "service/firebase-service/update-database-data";

interface Props {
  onClose: () => void;
  tabIndex: number;
}

const EditAvatarForm = ({ onClose, tabIndex }: Props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useAppSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState(
    user?.photoUrl ? user.photoUrl : DefaultAvatarSrc
  );

  useEffect(() => {
    setPhotoUrl(user?.photoUrl ? user.photoUrl : DefaultAvatarSrc);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex]);

  const onSubmit = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      if (file) {
        const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();
        const url = await uploadFile(file, `profile/${user.id}/${imageName}`);
        setPhotoUrl(url as string);

        const db = getDatabase();

        const currentUserRef = ref(db);

        await updateDataBaseData(
          {
            photoUrl: url as string,
          },
          "users/" + user.id
        );

        await onValue(currentUserRef, (snapshot) => {
          dispatch(setUser(snapshot.val()));
        });

        toast({
          status: "success",
          description: "Avatar updated successfully",
        });
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError)
        toast({
          status: "error",
          description: error.message,
        });
    }
    setIsLoading(false);
  };

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Box>
      <Text mb="10px" fontWeight="500" fontSize="lg">
        Change your photo
      </Text>
      <Text mb="22px" color="grey.300">
        Click on image to change
      </Text>

      <FormLabel htmlFor="avatar">
        <VisuallyHidden>
          <Input
            id="avatar"
            pt="6px"
            type="file"
            w="50%"
            accept=".jpg, .jpeg, .png"
            pointerEvents="auto"
            variant="outline"
            mt="6"
            onChange={handleChange}
          />
        </VisuallyHidden>
        <Avatar
          src={photoUrl}
          sx={{ width: 75, height: 75, cursor: "pointer" }}
        />
      </FormLabel>

      <Flex justifyContent="space-between" mt="50px">
        <Button
          variant="ghost"
          fontWeight="500"
          bg="grey.100"
          w="120px"
          color="grey.400"
          isDisabled={isLoading}
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </Button>

        <Button
          isLoading={isLoading}
          isDisabled={isLoading}
          colorScheme="primary"
          w="120px"
          ml="34px"
          onClick={onSubmit}
        >
          Save
        </Button>
      </Flex>
    </Box>
  );
};

export default EditAvatarForm;
