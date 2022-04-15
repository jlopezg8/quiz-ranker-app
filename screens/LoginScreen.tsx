import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Surface } from '../components/containers';
import { Button } from '../components/controls';
import {
  StatusSnackbar,
  SubmitButton,
  TextField as RawTextField,
  TextFieldType,
} from '../components/formik';
import { Logo } from '../components/misc';
import { InvalidCredentialsError } from '../errors/auth';
import { useAuthContext } from '../hooks/auth';
import Credentials, {
  credentialsInitialValues,
  credentialsSchema,
} from '../models/Credentials';
import { AuthStackScreenProps } from '../types';

const TextField: TextFieldType<Credentials> = RawTextField;

export default function LoginScreen(
  { navigation }: AuthStackScreenProps<'Login'>
) {
  const submit = useSubmit();
  return (
    <Formik
      initialValues={credentialsInitialValues}
      onSubmit={submit}
      validationSchema={credentialsSchema}
    >
      <Surface style={styles.surface}>
        <Logo style={styles.logo} />
        <TextField label="Usuario" name="username" autoCapitalize="none" />
        <TextField label="Contraseña" name="password" secureTextEntry />
        <SubmitButton label="Iniciar sesión" />
        <Button
          label="Registrarse"
          onPress={() => navigation.navigate('SignUp')}
          mode="text"
        />
        <StatusSnackbar />
      </Surface>
    </Formik>
  );
}

function useSubmit() {
  const { login } = useAuthContext();
  return React.useCallback(
    async (
      credentials: Credentials, { setStatus }: FormikHelpers<Credentials>
    ) => {
      try {
        await login(credentials);
      } catch (err) {
        setStatus(getLoginErrorMessage(err as Error));
      }
    },
    [login]
  );
}

function getLoginErrorMessage(error: Error): string {
  if (error instanceof InvalidCredentialsError) {
    return 'Usuario o contraseña incorrectos';
  } else {
    console.error(error);
    return 'No se pudo iniciar sesión. Ponte en contacto con Soporte.';
  }
}

const styles = StyleSheet.create({
  surface: {
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 32,
  },
});
