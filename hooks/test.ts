import React from 'react';
import { useQuery, useMutation } from 'react-query';

import { Answer, TestResult, TestService } from '../api';

export function useTestInit() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return createValue(state, dispatch);
}

interface State {
  answers: Answer[];
  testResult: TestResult | null;
}

interface Action {
  type: 'START_TEST' | 'SUBMIT_ANSWER' | 'SUBMIT_TEST';
  answer?: Answer;
  testResult?: TestResult;
}

function reducer(prevState: State, action: Action): State {
  switch (action.type) {
    case 'START_TEST':
      return initialState;
    case 'SUBMIT_ANSWER':
      return {
        answers: [...prevState.answers, action.answer!],
        testResult: null,
      };
    case 'SUBMIT_TEST':
      return {
        ...prevState,
        testResult: action.testResult!,
      };
  }
}

const initialState: State = {
  answers: [],
  testResult: null,
};

interface TestValue extends State {
  startTest(): void;
  submitAnswer(answer: Answer): void;
  useTestSubmitter(): ReturnType<typeof _useTestSubmitter>;
};

function createValue(state: State, dispatch: React.Dispatch<Action>)
  : TestValue
{
  return {
    ...state,
    startTest() {
      dispatch({ type: 'START_TEST' });
    },
    submitAnswer(answer: Answer) {
      dispatch({ type: 'SUBMIT_ANSWER', answer });
    },
    useTestSubmitter() {
      return _useTestSubmitter(dispatch);
    },
  };
}

function _useTestSubmitter(dispatch: React.Dispatch<Action>) {
  return useMutation(TestService.submitTest, {
    onSuccess(testResult) {
      dispatch({ type: 'SUBMIT_TEST', testResult });
    },
  });
}

export const TestContext = React.createContext<TestValue>(undefined!);

export function useTestContext() {
  return React.useContext(TestContext);
}

export function useTestGetter() {
  return useQuery('test', TestService.getTest);
}
