import * as SecureStore from 'expo-secure-store';

import { ApiError, AuthService, OpenAPI } from "../api";
import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from "../errors/auth";
import { Credentials, UserToCreate } from '../models';

const ACCESS_TOKEN_KEY = 'access_token';

export async function restoreState() {
  OpenAPI.TOKEN =
    await SecureStore.getItemAsync(ACCESS_TOKEN_KEY) ?? undefined;
  return {
    isLoggedIn: Boolean(OpenAPI.TOKEN),
  };
};

export async function login({ username, password }: Credentials) {
  try {
    const { access_token } = await AuthService.login({ username, password });
    OpenAPI.TOKEN = access_token;
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access_token);
  } catch (err) {
    if (err instanceof ApiError
        && err.message === 'Incorrect username or password')
    {
      throw new InvalidCredentialsError();
    }
    throw err;
  }
}

export async function signUp({ username, password }: UserToCreate) {
  try {
    const { access_token } =
      await AuthService.signup({ username, password });
    OpenAPI.TOKEN = access_token;
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access_token);
  } catch (err) {
    if (err instanceof ApiError && err.message === 'User already exists') {
      throw new UserAlreadyExistsError(username);
    }
    throw err;
  }
}

export async function logout() {
  OpenAPI.TOKEN = undefined;
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}
