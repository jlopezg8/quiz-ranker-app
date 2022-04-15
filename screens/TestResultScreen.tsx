import React from 'react';
import { StyleSheet } from 'react-native';
import { Headline, Subheading } from 'react-native-paper';

import { Surface } from '../components/containers';
import { useTestContext } from '../hooks/test';

export default function TestResultScreen() {
  const { testResult } = useTestContext();
  return (
    <Surface style={styles.surface}>
      <Headline style={styles.headline}>Resultado</Headline>
      <Subheading style={styles.subheading}>{testResult?.result}</Subheading>
    </Surface>
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
  subheading: {
    textAlign: 'center',
  },
});
