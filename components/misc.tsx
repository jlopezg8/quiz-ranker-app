import React from 'react';
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {
  Headline,
  HelperText as HelperTextBase,
  IconButton,
  Paragraph,
  ProgressBar,
  Snackbar as SnackbarBase,
  Title,
} from 'react-native-paper';

import Layout from '../constants/Layout';

export interface AlternativeStateProps {
  wrapperStyle?: StyleProp<ViewStyle>;
  icon: string;
  title: string;
  tagline: string;
}

export function AlternativeState(
  { wrapperStyle, icon, title, tagline }: AlternativeStateProps
) {
  return (
    <View style={[styles.alternativeState, wrapperStyle]}>
      <IconButton
        icon={icon}
        color="#03dac444"
        size={125}
        // Override `buttonSize = size * 1.5`:
        style={{ width: 125, height: 125 }}
      />
      <Title style={{ opacity: .66 }}>{title}</Title>
      <Paragraph>{tagline}</Paragraph>
    </View>
  );
}

export interface HelperTextProps {
  label?: string;
  error?: boolean;
  helperText?: string;
  errorText?: string;
  style?: StyleProp<TextStyle>;
}

export function HelperText(
  { label, error, helperText, errorText, style }: HelperTextProps
) {
  // Leave ' ' as is. '' makes the HelperText not take space
  helperText = helperText ?? (label?.endsWith('*') ? '*Requerido' : ' ');
  errorText = errorText ?? ' ';
  return (
    <HelperTextBase
      type={error ? 'error' : 'info'}
      style={[styles.helperText, style]}
      onPressIn={undefined}
      onPressOut={undefined}
    >
      {error ? errorText : helperText}
    </HelperTextBase>
  );
}

export interface LogoProps {
  style?: StyleProp<FlexStyle>;
}

export function Logo({ style }: LogoProps) {
  return <Headline style={[styles.logo, style]}>Sileo</Headline>;
}

export type ScreenProgressBarProps = React.ComponentProps<typeof ProgressBar> & {
  wrapperStyle?: StyleProp<ViewStyle>;
};

export function ScreenProgressBar(
  props: ScreenProgressBarProps
) {
  const { wrapperStyle, indeterminate, visible, style, ...otherProps } = props;
  return (
    <View style={[styles.screenProgressBarWrapper, wrapperStyle]}>
      <ProgressBar
        indeterminate={indeterminate ?? true}
        visible={visible ?? true}
        style={style}
        {...otherProps}
      />
    </View>
  );
}

export interface SnackbarProps {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  wrapperStyle?: StyleProp<ViewStyle>;
}

export function Snackbar(
  { visible, onDismiss, message, wrapperStyle }: SnackbarProps
) {
  return (
    <SnackbarBase
      visible={visible}
      onDismiss={onDismiss}
      action={{
        label: 'X',
        onPress: onDismiss,
      }}
      /*
       * Fixes a bug where the snackbar would have a width of 100% of the
       * parent's padding box (not the content box), and thus overflow.
       *
       * Also, this style has to be a plain old JS object (can't come from
       * Stylesheet.create), so that it's defined as an inline style and
       * doesn't get overridden.
       *
       * Also, we can't use `padding: 'inherit'` since that crashes on mobile,
       * so we have to recalculate it.
       */
      wrapperStyle={[
        {
          alignSelf: 'center',
          paddingVertical: Layout.padding,
          paddingHorizontal: 0,
        },
        wrapperStyle,
      ]}
      style={{ margin: 0 }} // override its `margin: 8`
    >
      {message}
    </SnackbarBase>
  );
}

const styles = StyleSheet.create({
  alternativeState: {
    alignItems: 'center',
  },
  helperText: {
    marginBottom: 8,
  },
  logo: {
    textAlign: 'center',
    fontSize: 32,
  },
  screenProgressBarWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
