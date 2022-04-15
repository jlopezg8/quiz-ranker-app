import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as ButtonBase, Menu as MenuBase } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useVisible from '../hooks/useVisible';

export type ButtonProps =
  Omit<React.ComponentProps<typeof ButtonBase>, 'children'>
  & { label: string; };

export function Button({ style, label, ...otherProps }: ButtonProps) {
  return (
    <ButtonBase
      mode="contained"
      style={[styles.button, style]}
      {...otherProps}
    >
      {label}
    </ButtonBase>
  );
}

type Action = () => void;

export interface MenuProps {
  anchor: (openMenu: Action) => React.ReactNode;
  items: (closeMenuAfter: (action: Action) => Action) => React.ReactNode;
}

export function Menu({ anchor, items }: MenuProps) {
  const menu = useVisible();
  const insets = useSafeAreaInsets();
  return (
    <MenuBase
      visible={menu.visible}
      onDismiss={menu.close}
      anchor={anchor(menu.open)}
      statusBarHeight={insets.top}
    >
      {items(menu.closeAfter)}
    </MenuBase>
  );
}

Menu.Item = MenuBase.Item;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});
