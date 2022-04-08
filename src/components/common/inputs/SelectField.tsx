import { useContext } from 'react';
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import styled from '@emotion/styled';
import { ReactComponent as ChevronDown } from 'assets/img/icons/chevron-down.svg';
import { EditFormContext } from './form-context';

const StyledChevronDown = styled(ChevronDown)`
  [data-disabled='true'] & {
    display: none;
  }
`;

interface Props extends SelectProps {
  name: string;
  label?: React.ReactNode;
  isRequired?: boolean;
  controlProps?: FormControlProps;
}

function SelectField({
  name,
  label,
  controlProps,
  isRequired,
  ...rest
}: Props) {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ name });
  const { editable, isLoading } = useContext(EditFormContext);

  return (
    <FormControl isInvalid={invalid} isRequired={isRequired} {...controlProps}>
      {!!label && <FormLabel color="grey.400">{label}</FormLabel>}
      {editable ? (
        <Select _placeholder={{color: 'red'}} icon={<StyledChevronDown />} {...field} {...rest} />
      ) : (
        <SkeletonText isLoaded={!isLoading} noOfLines={1}>
          <Text>{field.value}</Text>
        </SkeletonText>
      )}
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default SelectField;
