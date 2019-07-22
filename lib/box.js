import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variantColors, sizes, whitespace, spacePropTypes, getSpace } from './system';

export const Box = styled.div`
  ${whitespace}
  ${({ size }) => sizes[size]}
  ${({ variant }) => variantColors[variant]}
  ${({ rounded }) => rounded && `border-radius: var(--rounded)`}
`;

Box.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
  variant: PropTypes.oneOf(Object.keys(variantColors)),
  rounded: PropTypes.bool,
  ...spacePropTypes,
};
