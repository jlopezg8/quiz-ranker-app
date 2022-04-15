import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';

import { Menu } from './controls';

type NavigationProp =
  NativeStackNavigationProp<ParamListBase, keyof ParamListBase>;

export interface OverflowMenuProps {
  navigation: NavigationProp;
  /**
   * Should be OverflowMenu.Item(s), but we can't type check it
   * (https://github.com/microsoft/TypeScript/issues/13618).
   */
  children: React.ReactNode;
}

export default function OverflowMenu(
  { navigation, children }: OverflowMenuProps
) {
  return (
    <Menu
      anchor={openMenu => 
        <IconButton icon="dots-vertical" onPress={openMenu} />
      }
      items={closeMenuAfter =>
        <MenuContext.Provider
          value={{ closeMenuAfter, navigation }}
          /*
           * For some reason we have to directly wrap the children with the
           * context provider. If instead we wrap `Menu` with it, the children
           * get `undefined` as the context value.
           */
        >
          {children}
        </MenuContext.Provider>
      }
    />
  );
}

type Action = () => void;

type MenuContextType = {
  closeMenuAfter: (action: Action) => Action;
  navigation: NavigationProp;
};

const MenuContext = React.createContext<MenuContextType>(undefined!);

export interface OverflowMenuItemProps {
  label: string;
  linkTo?: string;
  onPress?: Action;
}

OverflowMenu.Item = function (
  { label, linkTo, onPress }: OverflowMenuItemProps
) {
  const { closeMenuAfter, navigation } = React.useContext(MenuContext);
  return (
    <Menu.Item
      onPress={closeMenuAfter(onPress ?? (() => navigation.navigate(linkTo!)))}
      title={label}
    />
  );
}
