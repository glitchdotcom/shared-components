import React from 'react';

const useDebouncedValue = (value, timeout) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);
    return () => window.clearTimeout(id);
  }, [value]);

  return debouncedValue;
};

export default useDebouncedValue;