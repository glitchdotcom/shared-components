import React from 'react';

export const useCallbackProxy = (fn) => {
  const ref = React.useRef(fn);
  React.useEffect(() => {
    ref.current = fn;
  }, [fn]);
  return React.useMemo(
    (...args) => {
      ref.current(...args);
    },
    [ref],
  );
};
