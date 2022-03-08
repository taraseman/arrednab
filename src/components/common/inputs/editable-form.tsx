import { Box, Button, Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createContext, useEffect, useState } from 'react';
import {
  FormProvider,
  useForm,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash';

interface Props {
  noEditMode?: boolean;
  isEditing?: boolean;
  isForLogo?: boolean;
  setIsEditing?: (newState: boolean) => void;
  schema?: yup.AnyObjectSchema;
  onClose?: () => void;
  onSubmit?: SubmitHandler<FieldValues>;
  values?: {
    [name: string]: object | string | number | null | undefined;
  };
  isLoading?: boolean;
  children:
    | React.ReactNode
    | ((editable: boolean, form: UseFormReturn) => React.ReactNode);
}

export const EditFormContext = createContext<{
  editable: boolean;
  isLoading?: boolean;
}>({
  editable: true,
  isLoading: false,
});

function EditableForm({
  isEditing,
  setIsEditing,
  noEditMode = false,
  schema,
  onSubmit,
  onClose,
  values,
  isLoading,
  children,
  isForLogo = false,
}: Props) {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState<boolean>(false);

  const form = useForm({
    resolver: schema && yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (values) {
      form.reset(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleSubmit =
    onSubmit &&
    form.handleSubmit(async () => {
      // another hack for correct handling of deep properties
      await onSubmit(form.watch());
      setEditMode(false);
      setIsEditing?.(false);
    });

  const getButtonLabel = () => {
    if (!isForLogo) {
      return editMode ? t('settings:Cancel') : t('settings:Edit');
    } else {
      return editMode ? t('settings:Cancel') : t('settings:Change');
    }
  };

  return (
    <EditFormContext.Provider value={{ editable: editMode, isLoading }}>
      <FormProvider {...form}>
        <Box
          as="form"
          pt={1}
          pb={4}
          mb={6}
          borderBottom="1px solid"
          borderColor="grey.200"
          onSubmit={handleSubmit}
        >
          <Flex justify="flex-end" alignItems="center">
            {!noEditMode && (
              <Button
                type="button"
                h="unset"
                fontSize="md"
                fontWeight="500"
                p="0"
                textDecoration="underline"
                backgroundColor="transparent"
                onClick={() => {
                  onClose && editMode && onClose();
                  setEditMode(!editMode);
                  setIsEditing?.(!isEditing);
                }}
                disabled={isEditing && !editMode}
              >
                {getButtonLabel()}
              </Button>
            )}
          </Flex>
          {typeof children === 'function' ? children(editMode, form) : children}
          <Button
            type="submit"
            mt="6"
            mb="2"
            w="120px"
            colorScheme="secondary"
            display={!editMode ? 'none' : 'block'}
            disabled={!form.formState.isValid || isEqual(form.watch(), values)}
            isLoading={isLoading}
          >
            {t('settings:Save')}
          </Button>
        </Box>
      </FormProvider>
    </EditFormContext.Provider>
  );
}

export default EditableForm;
