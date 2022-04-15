import { useField, useFormikContext } from 'formik';

import { Button } from './controls';
import {
  PasswordField,
  TextField as TextFieldBase,
  TextFieldProps as TextFieldPropsBase,
} from './inputs';
import { Snackbar, SnackbarProps } from './misc';

export interface StatusSnackbarProps {
  wrapperStyle?: SnackbarProps['wrapperStyle'];
}

export function StatusSnackbar({ wrapperStyle }: StatusSnackbarProps) {
  const { status, setStatus } = useFormikContext();
  const hasError = Boolean(status);
  const onDismiss = () => setStatus(undefined);
  return (
    <Snackbar
      visible={hasError}
      onDismiss={onDismiss}
      message={status}
      wrapperStyle={wrapperStyle}
    />
  );
}

export interface SubmitButtonProps {
  label: string;
}

export function SubmitButton({ label }: SubmitButtonProps) {
  const { submitForm, isSubmitting } = useFormikContext();
  return (
    <Button
      onPress={submitForm}
      loading={isSubmitting}
      disabled={isSubmitting}
      label={label}
    />
  );
}

export type TextFieldProps<Model> = TextFieldPropsBase & {
  label: string;
  name: keyof Model & string;
};

export function TextField<Model>(
  { secureTextEntry, label, name, ...otherProps }: TextFieldProps<Model>
) {
  const TheTextField = secureTextEntry ? PasswordField : TextFieldBase;
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.touched && meta.error);
  return (
    <TheTextField
      label={label}
      value={field.value}
      onChangeText={field.onChange(name)}
      onBlur={field.onBlur(name)}
      error={hasError}
      errorText={meta.error}
      {...otherProps}
    />
  );
}

export interface TextFieldType<Model> {
  (props: TextFieldProps<Model>): ReturnType<typeof TextField>
}
