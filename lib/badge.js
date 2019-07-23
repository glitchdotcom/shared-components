import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sizes, variantColors } from './system';
import { withProps } from './util';

const variants = {
  normal: styled.css`
    color: var(--colors-background);
    background-color: var(--colors-secondary);
  `,
  info: variantColors.info,
  success: variantColors.success,
  warning: variantColors.warning,
  error: variantColors.error,
};

export const Badge = withProps(
  styled.span`
    display: inline-block;
    font-family: var(--font-sans);
    font-weight: 600;
    padding: var(--opticalPadding);
    border-radius: var(--rounded);
    white-space: nowrap;
    ${({ variant }) => variants[variant]};
    ${({ size }) => sizes[size]};
  `,
  { 'data-module': 'Badge' },
);

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)),
  size: PropTypes.oneOf(Object.keys(sizes)),
};

Badge.defaultProps = {
  variant: 'normal',
  size: 'tiny',
};

const Container = styled.div`
  & > * {
    margin: 0 var(--space-1) var(--space-1) 0;
  }
`;

export const StoryBadge = () => (
  <>
    <Container>
      {['Normal', 'Info', 'Success', 'Warning', 'Error'].map((label) => (
        <Badge key={label} variant={label.toLowerCase()}>
          {label}
        </Badge>
      ))}
    </Container>
    <Container>
      {['Tiny', 'Small', 'Normal', 'Big', 'Bigger', 'Huge'].map((label) => (
        <Badge key={label} size={label.toLowerCase()}>
          {label}
        </Badge>
      ))}
    </Container>
  </>
);
