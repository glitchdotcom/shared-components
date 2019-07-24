import React from 'react';
import styled from 'styled-components';

export const useCallbackProxy = (callback) => {
  const ref = React.useRef(callback);
  React.useEffect(() => {
    ref.current = callback;
  }, [callback]);
  const proxiedCallback = React.useCallback(
    (...args) => {
      ref.current(...args);
    },
    [ref],
  );
  if (!callback) return null;
  return proxiedCallback;
};

export const withProps = (Component, outerProps) => styled(Component).attrs(() => outerProps)``;
