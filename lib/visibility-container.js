import React from 'react';
import PropTypes from 'prop-types';

export const useIntersectionObserver = ({ ratio }) => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);
  const [wasEverVisible, setWasEverVisible] = React.useState(false);
  React.useEffect(() => {
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      setWasEverVisible(true);
    }
    const observer = new IntersectionObserver(([container]) => {
      if (container.intersectionRatio > ratio) {
        setIsVisible(true);
        setWasEverVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ratio]);
  return { ref, isVisible, wasEverVisible };
};

export function VisibilityContainer({ children, ratio }) {
  const { ref, isVisible, wasEverVisible } = useIntersectionObserver({ ratio });

  return <div ref={ref}>{children({ isVisible, wasEverVisible })}</div>;
}

VisibilityContainer.propTypes = {
  children: PropTypes.func.isRequired,
  ratio: PropTypes.number,
};

VisibilityContainer.defaultProps = {
  ratio: 0,
};
