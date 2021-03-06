import {
  Button,
  Flex,
  SimpleGrid,
  useToast,
  Text,
  Box,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "components/common/inputs/TextField";
import { useAppSelector } from "hooks/redux";
import { setUser } from "service/userSlice";
import { getDatabase, ref, onValue } from "firebase/database";
import { FirebaseError } from "@firebase/util";
import { useEffect, useState } from "react";
import updateDataBaseData from "service/firebase-service/update-database-data";

interface EditUserInformationForm {
  firstName: string;
  lastName: string;
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is Required")
    .max(50, "signup:First Name is too long"),
  lastName: yup
    .string()
    .required("Last Name is Required")
    .max(50, "signup:Last Name is too long"),
});
interface Props {
  onClose: () => void;
  tabIndex: number;
}

const EditInformationForm = ({ onClose, tabIndex }: Props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useAppSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
      }
    : {};

  useEffect(() => {
    form.reset(defaultValues);
  }, [tabIndex]);

  const form = useForm<EditUserInformationForm>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async (values: EditUserInformationForm) => {
    if (!user) return;

    setIsLoading(true);

    const db = getDatabase();

    const currentUserRef = ref(db, "users/" + user.id);

    try {
      await updateDataBaseData(
        {
          firstName: values.firstName,
          lastName: values.lastName,
        },
        "users/" + user.id
      );

      await onValue(currentUserRef, (snapshot) => {
        dispatch(setUser(snapshot.val()));
      });

      toast({
        status: "success",
        description: "User updated successfully",
      });
    } catch (error: unknown) {
      form.reset(defaultValues);

      toast({
        status: "error",
        description: "Something went wrong",
      });
    }
    setIsLoading(false);
  };

  return (
    <FormProvider {...form}>
      <Box as="form" onSubmit={form.handleSubmit(onSubmit)}>
        <Text mb="22px" fontWeight="500" fontSize="lg">
          Change your information
        </Text>

        <SimpleGrid spacingY="6">
          <TextField name="firstName" label="First Name" />
          <TextField name="lastName" label="Last Name" />
        </SimpleGrid>
        <Flex justifyContent="space-between" mt="50px">
          <Button
            variant="ghost"
            fontWeight="500"
            bg="grey.100"
            w="120px"
            color="grey.400"
            isDisabled={isLoading}
            onClick={() => {
              form.reset();
              onClose();
            }}
          >
            Cancel
          </Button>

          <Button
            isLoading={isLoading}
            isDisabled={isLoading || !form.formState.isValid}
            colorScheme="primary"
            w="120px"
            ml="34px"
            type="submit"
          >
            Save
          </Button>
        </Flex>
      </Box>
    </FormProvider>
  );
};

export default EditInformationForm;
