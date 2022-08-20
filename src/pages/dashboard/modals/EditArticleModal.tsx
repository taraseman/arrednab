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
import { useEffect, useState } from "react";
import { Article } from "types/article-types";
import { v4 as uuidv4 } from "uuid";
import uploadFile from "service/firebase-service/upload-file";
import { useAppSelector } from "hooks/redux";
import { setArticles } from "service/articlesSlice";
import { useAppDispatch } from "hooks/redux";
import { FirebaseError } from "@firebase/util";
import { getDatabase, ref, onValue } from "firebase/database";
import SelectField from "components/common/inputs/SelectField";
import { categories } from "config/constants";
import { Categories } from "types/article-types";
import updateDataBaseData from "service/firebase-service/update-database-data";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  article: Article;
}

interface ArticleForm {
  title: string;
  description: string;
  category: Categories;
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

function EditArticleModal({ isOpen, onClose, article }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();
  const user = useAppSelector((state) => state.user.user);
  const [photoUrl, setPhotoUrl] = useState<null | string>(
    article.imageUrl
    // user?.photoUrl ? user.photoUrl : DefaultAvatarSrc
  );
  const form = useForm<ArticleForm>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (article) {
      form.reset({
        title: article.title,
        description: article.description,
        category: article.category,
      });
      setPhotoUrl(article.imageUrl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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

        await updateDataBaseData(
          {
            title: data.title,
            description: data.description,
            imageUrl: url as string,
            category: data.category,
          },
          "articles/" + article.id
        );
      } else {
        await updateDataBaseData(
          {
            title: data.title,
            description: data.description,
            category: data.category,
          },
          "articles/" + article.id
        );
      }
      const db = getDatabase();
      const dbRef = ref(db, "articles");

      await onValue(dbRef, (snapshot) => {
        if (snapshot.val() !== null) {
          dispatch(
            setArticles(Object.values(snapshot.val()).reverse() as Article[])
          );
        }
      });

      toast({
        status: "success",
        description: "Avatar updated successfully",
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError)
        toast({
          status: "error",
          description: error.message,
        });
    }

    handleClose();
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    setFile(file);
    setPhotoUrl(URL.createObjectURL(file));
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
              Edit article
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
                  {categories.map((category) => (
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
                Save
              </Button>
            </ModalFooter>
          </Box>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
}

export default EditArticleModal;
