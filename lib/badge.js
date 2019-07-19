import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variantColors } from './system';

const variants = {
  normal: variantColors.inverted,
  success: variantColors.success,
  warning: variantColors.warning,
  error: variantColors.error,
};

export const Badge = styled.span.attrs(() => ({ 'data-module': 'Badge' }))`
  display: inline-block;
  font-family: var(--font-sans);
  font-size: var(--fontSizes-tiny);
  font-weight: 600;
  padding: var(--opticalPadding);
  border-radius: var(--rounded);
  white-space: nowrap;
  ${({ variant }) => variants[variant]};
`;

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)),
};

Badge.defaultProps = {
  variant: 'normal',
};

export const StoryBadge = () => (
  <div>
    <Badge variant="normal">Normal</Badge> <Badge variant="success">Success</Badge> <Badge variant="warning">Warning</Badge>{' '}
    <Badge variant="error">Error</Badge>
  </div>
);
