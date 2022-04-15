import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface as SurfaceBase } from 'react-native-paper';

import Layout from '../constants/Layout';

export function Surface(props: React.ComponentProps<typeof SurfaceBase>) {
  const { style, ...otherProps } = props;
  return <SurfaceBase style={[styles.surface, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    padding: Layout.padding,
  },
});
