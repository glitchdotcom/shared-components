import React from 'react';
import PropTypes from 'prop-types';

const LazyLoader = ({ children, delay }) => {
  const [shouldLoad, setShouldLoad] = React.useState(false);
  React.useEffect(
    () => {
      const timer = window.setTimeout(() => setShouldLoad(true), delay);
      return () => window.clearTimeout(timer);
    },
    [delay],
  );

  return shouldLoad ? children : null;
}

LazyLoader.propTypes = {
  // time to delay load in ms
  delay: PropTypes.number.isRequired,
};

export default LazyLoader;

