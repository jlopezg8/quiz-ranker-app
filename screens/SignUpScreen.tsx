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
import { UserAlreadyExistsError } from '../errors/auth';
import { useAuthContext } from '../hooks/auth';
import {
  UserToCreate,
  userToCreateInitialValues,
  userToCreateSchema,
} from '../models/User';
import { AuthStackScreenProps } from '../types';

const TextField: TextFieldType<UserToCreate> = RawTextField;

export default function SignUpScreen(
  { navigation }: AuthStackScreenProps<'SignUp'>
) {
  const submit = useSubmit();
  return (
    <Formik
      initialValues={userToCreateInitialValues}
      onSubmit={submit}
      validationSchema={userToCreateSchema}
    >
      <Surface style={styles.surface}>
        <Logo style={styles.logo} />
        <TextField label="Usuario" name="username" autoCapitalize="none" />
        <TextField label="Contraseña" name="password" secureTextEntry />
        <SubmitButton label="Registrarse" />
        <Button
          label="Iniciar sesión"
          onPress={() => navigation.navigate('Login')}
          mode="text"
        />
        <StatusSnackbar />
      </Surface>
    </Formik>
  );
}

function useSubmit() {
  const { signUp } = useAuthContext();
  return React.useCallback(
    async (user: UserToCreate, { setStatus }: FormikHelpers<UserToCreate>) => {
      try {
        await signUp(user);
      } catch (err) {
        setStatus(getSignUpErrorMessage(err as Error));
      }
    },
    [signUp]
  );
}

function getSignUpErrorMessage(error: Error): string {
  if (error instanceof UserAlreadyExistsError) {
    return 'El usuario ya está en uso. Prueba con otro.';
  } else {
    console.error(error);
    return 'No se pudo realizar el registro. Ponte en contacto con Soporte.';
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
