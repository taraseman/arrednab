import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  SimpleGrid,
  useToast,
  Flex,
  Text,
  FormLabel,
  Image,
  VisuallyHidden,
  Input,
  ModalHeader,
  ModalOverlay,
  Box,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "components/common/inputs/TextField";
import { useState } from "react";
import { Article } from "types/article-types";
import { v4 as uuidv4 } from "uuid";
import setDataBaseData from "service/firebase-service/set-database-data";
import uploadFile from "service/firebase-service/upload-file";
import { useAppSelector } from "hooks/redux";
import { FirebaseError } from "@firebase/util";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import SelectField from "components/common/inputs/SelectField";
import { categoryies } from "config/constants";
import { categories } from "types/article-types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface ArticleForm {
  title: string;
  description: string;
  category: categories;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(255, "Title is too long"),
  description: yup
    .string()
    .required("Description is required")
    .max(1000, "Description is too long"),
  category: yup.string().required("Category is required"),
});

function AddArticleModal({ isOpen, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();
  const user = useAppSelector((state) => state.user.user);
  const [photoUrl, setPhotoUrl] = useState<null | string>(
    null
    // user?.photoUrl ? user.photoUrl : DefaultAvatarSrc
  );
  const form = useForm<ArticleForm>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: "onChange",
  });

  const handleClose = () => {
    onClose();
    form.reset();
    setPhotoUrl(null);
  };

  const onSubmit = async (data: ArticleForm) => {
    if (!photoUrl || !user) return;
    setIsLoading(true);

    try {
      if (file) {
        const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();
        const url = await uploadFile(file, `article/${user.id}/${imageName}`);

        const db = getDatabase();
        const articleListRef = await ref(db, "articles");
        const newPostRef = await push(articleListRef);

        console.log({
          id: newPostRef.ref.key,
          authorId: user.id,
          authorAvatarUrl: user?.photoUrl || null,
          displayName: user.firstName + ' ' + user.lastName,
          title: data.title,
          description: data.description,
          comments: [],
          imageUrl: url as string,
          category: data.category,
          created: Date.now(),
        })

        await set(newPostRef, {
          id: newPostRef.ref.key,
          authorId: user.id,
          displayName: user.firstName + ' ' + user.lastName,
          authorAvatarUrl: user?.photoUrl || null,
          authorEmail: user.email,
          title: data.title,
          description: data.description,
          comments: [],
          imageUrl: url as string,
          category: data.category,
          created: Date.now(),
        });

        toast({
          status: "success",
          description: "Avatar updated successfully",
        });
      }
    } catch (error: unknown) {
      console.log(error)
      if (error instanceof FirebaseError)
        toast({
          status: "error",
          description: error.message,
        });
    }

    handleClose();
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
    <Modal isOpen={isOpen} closeOnEsc={false} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent p="10px">
        <FormProvider {...form}>
          <Box as="form" onSubmit={form.handleSubmit(onSubmit)}>
            <ModalHeader
              color="grey.600"
              fontWeight="500"
              fontSize="xl"
              pb="32px"
            >
              Add new article
            </ModalHeader>
            <ModalBody>
              <SimpleGrid spacingY="6">
                <TextField
                  name="title"
                  label="Title"
                  placeholder="Enter your title"
                />
                <TextField
                  InputComponent={Textarea}
                  name="description"
                  label="Text"
                  placeholder="Enter your text copy"
                  resize="vertical"
                />
                <SelectField
                  name="category"
                  label="Category"
                  placeholder="Chose category of the article"
                >
                  {categoryies.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </SelectField>
              </SimpleGrid>

              <Text mt="6" mb="10px" fontWeight="500" fontSize="lg">
                Add cover photo
              </Text>
              <Text mb="22px" color="grey.300">
                {photoUrl ? "Click on image to change" : "Choose a photo"}
              </Text>

              <FormLabel htmlFor="image" fontWeight="500" marginRight="0">
                <VisuallyHidden>
                  <Input
                    id="image"
                    pt="6px"
                    type="file"
                    w="100%"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleChange}
                  />
                </VisuallyHidden>

                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    sx={{ width: "100%", cursor: "pointer" }}
                  />
                ) : (
                  <Flex
                    _hover={{ cursor: "pointer" }}
                    h="100px"
                    justify="center"
                    align="center"
                    border="1px  dashed"
                    borderColor="grey.200"
                  >
                    <Text textDecoration="underline">Choose</Text>
                  </Flex>
                )}
              </FormLabel>
            </ModalBody>
            <ModalFooter justifyContent="space-between" mt="50px">
              <Button
                disabled={isLoading}
                onClick={handleClose}
                variant="ghost"
                fontWeight="500"
                bg="grey.100"
                w="120px"
                color="grey.400"
              >
                Cancel
              </Button>

              <Button
                isDisabled={!form.formState.isValid || !photoUrl || isLoading}
                isLoading={isLoading}
                colorScheme="primary"
                w="120px"
                ml="34px"
                type="submit"
              >
                Add
              </Button>
            </ModalFooter>
          </Box>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
}

export default AddArticleModal;
