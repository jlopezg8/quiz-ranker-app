import React from 'react';

export default function useVisible() {
  const [visible, setVisible] = React.useState(false);
  const open = () => setVisible(true);
  const close = () => setVisible(false);
  const closeAfter = (action: () => void) =>
    () => {
      action();
      close();
    };
  return { visible, open, close, closeAfter };
}
