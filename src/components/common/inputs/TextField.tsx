import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormLabel,
    Input,
    InputProps,
    SkeletonText,
    Text,
  } from '@chakra-ui/react';
  import { useContext } from 'react';
  import { get, useFormContext } from 'react-hook-form';
  import trimInputValue from 'utils/trimInputValue';
  import { EditFormContext } from './editable-form';
  
  interface Props extends InputProps {
    name: string;
    label: React.ReactNode;
    isRequired?: boolean;
    controlProps?: FormControlProps;
    InputComponent?: string | React.ComponentType;
    trim?: boolean;
  }
  function TextField({
    name,
    label,
    isRequired,
    controlProps,
    InputComponent = Input,
    trim = false,
    ...inputProps
  }: Props) {
    const form = useFormContext();
    const { editable, isLoading } = useContext(EditFormContext);
  
    return (
      <FormControl
        id={name}
        isInvalid={get(form.formState.errors, name)}
        isRequired={isRequired}
        onBlur={trim ? trimInputValue(form) : undefined}
        {...controlProps}
      >
        <FormLabel color="grey.400">{label}</FormLabel>
        {editable ? (
          <InputComponent
            {...form.register(name)}
            {...inputProps}
          ></InputComponent>
        ) : (
          <SkeletonText isLoaded={!isLoading} noOfLines={1}>
            <Text>{form.watch(name)}</Text>
          </SkeletonText>
        )}
        <FormErrorMessage>
          {get(form.formState.errors, name)?.message}
        </FormErrorMessage>
      </FormControl>
    );
  }
  export default TextField;
  