import {
  Button,
  Modal,
  Flex,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import SelectField from "components/common/inputs/SelectField";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { User, UserRole } from "types/user-types";
import { getDatabase, ref, onValue } from "firebase/database";
import { setUser } from "service/userSlice";
import { useDispatch } from "react-redux";
import { FirebaseError } from "@firebase/util";
import { useState } from "react";
import setDataBaseData from "service/firebase-service/set-database-data";

const schema = () =>
  yup.object().shape({
    role: yup.string().required("Position is Required"),
  });

interface RoleForm {
  role: UserRole;
}

interface Props {
  user: User | null;
  onClose: () => void;
}

function ChoseRoleModal({ user, onClose }: Props) {
  const toast = useToast();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RoleForm>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema()),
    mode: "onChange",
  });

  const onSubmit = async (values: RoleForm) => {
    if (!user) return;
    setIsLoading(true);

    const db = getDatabase();

    const currentUserRef = ref(db);

    try {
      await setDataBaseData<User>(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: values.role,
        },
        "users/" + user.id
      );

      await onValue(currentUserRef, (snapshot) => {
        dispatch(setUser(snapshot.val()));
      });

      history.push("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast({
          status: "error",
          description: error.message,
        });
        history.push("/login");
      }
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={!!user} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <FormProvider {...form}>
        <ModalContent as="form" onSubmit={form.handleSubmit(onSubmit)} p="32px">
          <ModalHeader
            color="grey.600"
            fontWeight="500"
            fontSize="xl"
            pb="20px"
          >
            Pick your Position in Journalism
          </ModalHeader>

          <SelectField mb="4" name="role" placeholder="Chose your position">
            <option value="nUser">
              Novice Journalist | Looking for a job or want to improve my skills
              and get feedback from professionals
            </option>
            <option value="pUser">
              Professional Journalist | Looking for employee or interesting
              people
            </option>
          </SelectField>

          <Flex w="100%" justify="flex-end">
            <Button
              colorScheme="primary"
              w="120px"
              ml="34px"
              type="submit"
              isDisabled={!form.formState.isValid}
              isLoading={isLoading}
            >
              Continue
            </Button>
          </Flex>
        </ModalContent>
      </FormProvider>
    </Modal>
  );
}

export default ChoseRoleModal;
