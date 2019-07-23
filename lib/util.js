import React from 'react';

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

export const withProps = (Component, outerProps) => React.forwardRef((props, ref) => <Component ref={ref} {...outerProps} {...props} />);
