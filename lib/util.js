import React from 'react';
import styled from 'styled-components'

export const useCallbackProxy = (fn) => {
  if (!fn) return null;
  const ref = React.useRef(fn);
  React.useEffect(() => {
    ref.current = fn;
  }, [fn]);
  return React.useCallback(
    (...args) => {
      ref.current(...args);
    },
    [ref],
  );
};

export const withProps = (Component, outerProps) => styled(Component).attrs(() => outerProps)``
