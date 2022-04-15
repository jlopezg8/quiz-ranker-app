import React from 'react';

import { Credentials, UserToCreate } from '../models';
import * as AuthService from '../services/auth';

export function useAuthInit() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => { restoreState(dispatch); }, []);
  return createValue(state, dispatch);
}

interface State {
  isLoading: boolean;
  isLoggedIn: boolean;
  isLogout: boolean;
}

interface Action {
  type: 'RESTORE_STATE' | 'LOGIN' | 'LOGOUT' ;
  isLoggedIn?: boolean;
}

function reducer(prevState: State, action: Action): State {
  switch (action.type) {
    case 'RESTORE_STATE':
      return {
        ...prevState,
        isLoading: false,
        isLoggedIn: action.isLoggedIn ?? false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        isLoggedIn: true,
        isLogout: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        isLoggedIn: false,
        isLogout: true,
      };
  }
}

const initialState: State = {
  isLoading: true,
  isLoggedIn: false,
  isLogout: false,
};

async function restoreState(dispatch: React.Dispatch<Action>) {
  const { isLoggedIn } = await AuthService.restoreState();
  dispatch({ type: 'RESTORE_STATE', isLoggedIn });
};

interface AuthValue extends State {
  login(credentials: Credentials): Promise<void>;
  signUp(user: UserToCreate): Promise<void>;
  logout(): Promise<void>;
}

function createValue(state: State, dispatch: React.Dispatch<Action>)
  : AuthValue
{
  return {
    ...state,
    async login(credentials: Credentials) {
      await AuthService.login(credentials);
      dispatch({ type: 'LOGIN' });
    },
    async signUp(user: UserToCreate) {
      await AuthService.signUp(user);
      dispatch({ type: 'LOGIN' });
    },
    async logout() {
      await AuthService.logout();
      dispatch({ type: 'LOGOUT' });
    },
  };
}

export const AuthContext = React.createContext<AuthValue>(undefined!);

export function useAuthContext() {
  return React.useContext(AuthContext);
}
