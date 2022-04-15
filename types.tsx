/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  TestNav: NavigatorScreenParams<TestStackParamList>;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, Screen>;

export type TestStackParamList = {
  StartTest: undefined;
  Test: undefined;
  TestResult: undefined;
};

export type TestStackScreenProps<Screen extends keyof TestStackParamList> =
  NativeStackScreenProps<TestStackParamList, Screen>;
