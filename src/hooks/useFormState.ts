import { Dispatch, SetStateAction, useState } from 'react';

export interface FormState<T> {
  value: T;
  handleFieldChange: (fieldName: string, value: unknown) => void;
  areValidationsEnabled: boolean;
  setAreValidationsEnabled: (areActive: boolean) => void;
  setForm: Dispatch<SetStateAction<T>>;
}

const useFormState = <T>(initialFormValue: T): FormState<T> => {
  const [formValue, setFormValue] = useState<T>(initialFormValue);

  const [areValidationsEnabled, setAreValidationsEnabled] = useState(false);

  const handleFieldChange = (fieldName: string, value: unknown): void =>
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [fieldName]: value,
    }));

  return {
    value: formValue,
    handleFieldChange,
    areValidationsEnabled,
    setAreValidationsEnabled,
    setForm: setFormValue,
  };
};

export default useFormState;