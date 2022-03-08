import { cloneDeep } from 'lodash';
import { UseFormReturn } from 'react-hook-form';

const trim =
  (form: UseFormReturn<any>) => (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name;
    form.setValue(name, e.target.value.trim());
    const prevValues = form.watch();
    // hack to check validation and not break anything
    form.reset(cloneDeep(prevValues));
  };

export default trim;
