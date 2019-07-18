import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const debounce = (fn, timeout) => {
  let handle;
  return (...args) => {
    if (handle) window.clearTimeout(handle);
    handle = window.setTimeout(() => fn(...args), timeout);
  };
};

const usePositionAdjustment = ({ margin }) => {
  const [offset, setOffset] = React.useState({ top: 0, left: 0 });
  const ref = React.useRef();
  React.useLayoutEffect(() => {
    const setPosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect) {
          if (rect.left < margin) {
            setOffset((prevOffset) => ({ ...prevOffset, left: margin - rect.left }));
          } else if (rect.right > window.innerWidth - margin) {
            setOffset((prevOffset) => ({ ...prevOffset, left: window.innerWidth - margin - rect.right }));
          } else {
            setOffset((prevOffset) => ({ ...prevOffset, left: 0 }));
          }
        }
      }
    };
    const debounced = debounce(setPosition, 300);
    window.addEventListener('resize', debounced);
    setPosition();
    return () => window.removeEventListener('resize', debounced);
  }, [margin]);
  return { ref, offset };
};

const PopoverWrap = styled.div`
  position: absolute;
  ${({ size }) => sizes[size]}
  ${({ align }) => alignments[align]}
`;

const sizes = {
  normal: styled.css`
    width: auto;
  `,
  large: styled.css`
    width: 22rem;
     `,
};
const alignments = {
  left: styled.css`
    left: 0;
  `,
  right: styled.css`
    right: 0;
  `,
  topLeft: styled.css`
    left: 0;
    bottom: 100%;
  `,
  topRight: styled.css`
    right: 0;
    bottom: 100%;
  `,
}

const PopoverInner = styled.div`
  position: relative;
  overflow: hidden;
  // TODO: should these be defined on here or on the sections?
  background-color: var(--colors-background);
  font-size: var(--fontSizes-small);
  border-radius: var(--rounded);

  border: 1px solid var(--colors-border);
  box-shadow: var(--pop-shadow);
  z-index: 1;
`;

export const PopoverContent = styled.withTheme(({ size, align, children, theme, ...props }) => {
  const { ref, offset } = usePositionAdjustment(theme.space[2]);
  return (
    <PopoverWrap data-module="PopoverContent" size={size} align={align} {...props}>
      <PopoverInner ref={ref} style={offset}>
        {children}
      </PopoverInner>
    </PopoverWrap>
  );
});

PopoverContent.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
  align: PropTypes.oneOf(Object.keys(alignments)).isRequired,
  children: PropTypes.node.isRequired,
};
PopoverContent.defaultProps = {
  size: 'normal',
};
