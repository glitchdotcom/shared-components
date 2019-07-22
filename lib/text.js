import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sizes } from './system'; 

const get = (path, defaultValue) => (obj) => {
  let result = obj
  for (const key of path) {
    if (key in obj) {
      result = result[key]
    } else {
      return defaultValue
    }
  }
  return result
}

const margin = styled.css`
  margin-top: ${get(['margin', 'top'], 0)};
  margin-bottom: ${get(['margin', 'bottom'], 0)};
  margin-left: ${get(['margin', 'left'], 'auto')};
  margin-right: ${get(['margin', 'right'], 'auto')};
`

export const P = styled.p`
  margin: ${margin};
  font-size: ${({ size }) => sizes[size] || 'inherit'};
  font-weight: normal;
  & + & {
    margin-top: ${get(['margin', 'top'], 'var(--space-1)')};
  }
`
P.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
  margin: PropTypes.shape({
    top:
  })
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
  2: ""
}

const HBase = styled.h1`
  margin: ${margin};
  font-size: ${({ size, level }) => sizes[size] || defaultSizes[level]};
  font-weight: bold;
`


export const H = ({ level, size })