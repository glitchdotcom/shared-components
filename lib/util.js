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

export const withDataModule = (label, Component) => React.forwardRef((props, ref) => <Component data-module={label} ref={ref} {...props} />);
