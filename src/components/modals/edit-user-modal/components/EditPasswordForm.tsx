import {
  Button,
  Flex,
  SimpleGrid,
  useToast,
  Text,
  Box,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "components/common/inputs/TextField";
import { useAppSelector } from "hooks/redux";

import {
  updatePassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";

interface EditUserPasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(256, "Password is too long"),
  newPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(256, "Password is too long")
    .matches(/.*?[A-Z]/, "Password must have at least one uppercase character")
    .matches(/.*?[a-z]/, "Password must have at least one lowercase character")
    .matches(/.*?[0-9]/, "Password must have at least one number"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .min(8, "Password must be at least 8 characters")
    .max(256, "Password is too long")
    .test(
      "isSame",
      "Passwords don't match",
      (value, ctx) => value === ctx.parent.newPassword
    ),
});
interface Props {
  onClose: () => void;
  tabIndex: number;
}

const EditPasswordForm = ({ onClose, tabIndex }: Props) => {
  const toast = useToast();
  const user = useAppSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    form.reset();
  }, [tabIndex]);

  const form = useForm<EditUserPasswordForm>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: "onChange",
  });

  const onSubmit = async (values: EditUserPasswordForm) => {
    if (!user) return;

    setIsLoading(true);
    const auth = getAuth();

    try {
      const currentUser = await signInWithEmailAndPassword(
        auth,
        user.email,
        values.oldPassword
      );
      await updatePassword(currentUser.user, values.newPassword);

      toast({
        status: "success",
        description: "Password updated successfully",
      });
      form.reset();
    } catch (error: unknown) {
      form.reset();
      toast({
        status: "error",
        description: "Wrong old password",
      });
    }
    setIsLoading(false);
  };

  return (
    <FormProvider {...form}>
      <Box as="form" onSubmit={form.handleSubmit(onSubmit)}>
        <Text mb="22px" fontWeight="500" fontSize="lg">
          Change your password
        </Text>

        <SimpleGrid spacingY="6">
          <Box mb={4}>
            <TextField
              name="oldPassword"
              label="Old Password"
              type="password"
              placeholder="Old Password"
            />
          </Box>
          <Box mb={4}>
            <TextField
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="New Password"
            />
          </Box>
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your Password"
          />
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

export default EditPasswordForm;
