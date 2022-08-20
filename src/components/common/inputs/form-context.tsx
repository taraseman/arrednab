import { createContext} from 'react';

export const EditFormContext = createContext<{
  editable: boolean;
  isLoading?: boolean;
}>({
  editable: true,
  isLoading: false,
});

