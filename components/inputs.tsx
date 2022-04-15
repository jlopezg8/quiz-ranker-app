import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { HelperText } from './misc';

export type TextFieldProps =
  Omit<React.ComponentProps<typeof TextInput>, 'autoComplete'>
  & {
    label?: string;
    helperText?: string;
    errorText?: string;
    autoComplete?: unknown;
  };

export function TextField(
  {
    label,
    value,
    error,
    helperText,
    errorText,
    autoComplete,
    ...otherProps
  }: TextFieldProps
) {
  return (
    <View>
      <TextInput
        label={label}
        value={value ?? ''}
        mode="outlined"
        error={error}
        dense
        autoComplete={autoComplete}
        {...otherProps}
      />
      <HelperText
        label={label}
        error={error}
        helperText={helperText}
        errorText={errorText}
      />
    </View>
  );
}

export function PasswordField(props: TextFieldProps) {
  const [hidden, setHidden] = React.useState(true);
  return (
    <TextField
      secureTextEntry={hidden}
      right={
        <TextInput.Icon
          name={hidden ? 'eye' : 'eye-off'}
          onPress={() => setHidden(!hidden)}
          forceTextInputFocus={false}
        />
      }
      {...props}
    />
  );
}
