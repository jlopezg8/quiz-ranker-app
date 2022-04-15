import React from 'react';
import { StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';

import { Question, Test } from '../api';
import { Surface } from '../components/containers';
import { Button } from '../components/controls';
import { AlternativeState, ScreenProgressBar } from '../components/misc';
import { useTestContext, useTestGetter } from '../hooks/test';
import { TestStackScreenProps } from '../types';

export default function TestScreen(
  { navigation }: TestStackScreenProps<'Test'>
) {
  const { isLoading, data: test, isError } = useTestGetter();
  const handleSubmit = () => navigation.replace('TestResult');
  return (
    <Surface style={styles.surface}>
      {isLoading && <ScreenProgressBar visible={isLoading} />}
      {test && <TestTaker test={test} onSubmit={handleSubmit} />}
      {isError && <GetTestErrorState />}
    </Surface>
  );
}

function TestTaker(
  { test: { questions }, onSubmit }: { test: Test; onSubmit: () => void }
) {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  return questionIndex >= questions.length
    ? <TestSubmitter onSubmit={onSubmit} />
    : <AnswerSubmitter
        key={questionIndex}
        question={questions[questionIndex]}
        onSubmit={() => setQuestionIndex(questionIndex + 1)}
      />;
}

function TestSubmitter({ onSubmit }: { onSubmit: () => void }) {
  const { useTestSubmitter, answers } = useTestContext();
  const { mutateAsync: submitTest, isLoading } = useTestSubmitter();
  return <>
    <Headline style={styles.headline}>Fin</Headline>
    <Button
      label="Enviar"
      onPress={() => { submitTest({ answers }).then(onSubmit); }}
      loading={isLoading}
      disabled={isLoading}
    />
  </>;
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function AnswerSubmitter(
  { question, onSubmit }: { question: Question; onSubmit: () => void; }
) {
  const [selectionIndex, setSelectionIndex] = React.useState(-1);
  const { submitAnswer } = useTestContext();
  return <>
    <Headline style={styles.headline}>{question.question}</Headline>
    {question.choices.map((choice, index) => {
      const handlePress = selectionIndex !== -1
        ? undefined
        : () => {
          setSelectionIndex(index);
          submitAnswer({
            question_key: question.key,
            answer_index: index,
          });
          wait(1500).then(onSubmit);
        };
      return (
        <Button
          key={index}
          label={choice}
          onPress={handlePress}
          mode={index === selectionIndex ? 'contained' : 'outlined'}
          style={{ alignSelf: 'stretch' }}
        />
      );
    })}
  </>;
}

function GetTestErrorState() {
  return (
    <AlternativeState
      icon="cloud-alert"
      title="Error"
      tagline="No se pudo obtener el test. Ponte en contacto con Soporte."
    />
  );
}

const styles = StyleSheet.create({
  surface: {
    justifyContent: 'center',
  },
  headline: {
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 32,
  },
});
