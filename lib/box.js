import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variantColors, sizes, margin, padding, spacePropType, getSpace } from './system'; 

export const Box = styled.div`
  ${margin}
  ${padding}
  ${({ size }) => sizes[size]}
  ${({ variant }) => variantColors[variant]}
`

Box.PropTypes = {
  margin: spacePropType,
  padding: spacePropType,
  size: PropTypes.oneOf(Object.keys(sizes)),
  variant: PropTypes.oneOf(Object.keys(variantColors)),
}
