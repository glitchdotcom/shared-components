import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sizes } from './system'; 

const getSpace = (key, defaultValue) => ({ margin }) => {
  if (!margin || !(key in margin)) return defaultValue
  return `var(--spaces-${margin[key]})`
}

const margin = styled.css`
  margin-top: ${getSpace('top', 0)};
  margin-bottom: ${getSpace('bottom', 0)};
  margin-left: ${getSpace('left', 'auto')};
  margin-right: ${getSpace('right', 'auto')};
`

const marginPropType = PropTypes.shape({
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
})

export const P = styled.p`
  margin: ${margin};
  font-size: ${({ size }) => sizes[size] || 'inherit'};
  font-weight: normal;
  & + & {
    margin-top: ${getSpace('top', 'var(--space-1)')};
  }
`
P.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
  margin: marginPropType,
}

const hLevels = {
  1: "h1",
  2: "h2",
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
}

const defaultSizes = {
  1: "huge",
  2: "bigger",
  3: "big",
  4: "normal",
  5: "small",
  6: "tiny",
}

const HBase = styled.h1`
  margin: ${margin};
  font-size: ${({ size, level }) => sizes[size] || defaultSizes[level]};
  font-weight: bold;
`

export const H = ({ level, ...props }) => (
  <HBase as={hLevels[level]} {...props} />
)
H.propTypes = {
  level: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.oneOf(Object.keys(hLevels)).isRequired,
  ]).isRequired,
  size: PropTypes.oneOf(Object.keys(sizes)),
  margin: marginPropType,
}