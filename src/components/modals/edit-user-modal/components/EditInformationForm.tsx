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
import { useEffect, useState } from "react";
import updateDataBaseData from "service/firebase-service/update-database-data";
import { updateUser } from "service/allUsersSlice";

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
  const users = useAppSelector((state) => state.users.users);
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues =
    user && users
      ? {
          firstName: users[user.id].firstName,
          lastName: users[user.id].lastName,
        }
      : {};

  useEffect(() => {
    form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, users]);

  const form = useForm<EditUserInformationForm>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async (values: EditUserInformationForm) => {
    if (!user) return;
    setIsLoading(true);

    try {
      await updateDataBaseData(
        {
          firstName: values.firstName,
          lastName: values.lastName,
        },
        "users/" + user.id
      );

      dispatch(
        updateUser({
          id: user.id,
          firstName: values.firstName,
          lastName: values.lastName,
        })
      );

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
            data-testid="edit-user-info-cancel"
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
            data-testid="edit-user-info-save"
          >
            Save
          </Button>
        </Flex>
      </Box>
    </FormProvider>
  );
};

export default EditInformationForm;
