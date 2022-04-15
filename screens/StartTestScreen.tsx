import React from 'react';
import { StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';

import { Surface } from '../components/containers';
import { Button } from '../components/controls';
import { useTestContext } from '../hooks/test';
import { TestStackScreenProps } from '../types';

export default function StartTestScreen(
  { navigation }: TestStackScreenProps<'StartTest'>
) {
  const { startTest } = useTestContext();
  return (
    <Surface style={styles.surface}>
      <Headline style={styles.headline}>¡Hola!</Headline>
      <Button
        label="Iniciar prueba"
        onPress={() => {
          startTest();
          navigation.navigate('Test');
        }}
      />
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
});
