import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sizes } from './system'; 

const margin = (key) => ({ margin = {} }) => margin[key]

const margin = styled.css`
  margin-top: ${get('top') || 0};
  margin-bottom: ${get('bottom') || 0};
  margin-left: ${get('left') || 'auto'};
  margin-right: ${get('right') || 'auto'};
`

const P = styled.p`
  margin: 0;
  font-size: ${({ size }) => sizes[size] || 'inherit'};
  font-weight: normal;
  & + & {
    margin-top: var(--space-1);
  }
`

const HBase = styled.h1`
  margin: 0;
  font-size: ${({ size }) => sizes[size] || 'inherit'};
  font-weight: bold;
`


const hLevels = {
  1: "h1",
  2: "h2",
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
}

export const H = ({ level, size })