import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const variants = {
  normal: styled.css`
    color: var(--colors-background);
    background-color: var(--colors-primary);
  `,
  success: styled.css`
    color: var(--colors-success-text);
    background-color: var(--colors-success-background);
  `,
  warning: styled.css`
    color: var(--colors-warning-text);
    background-color: var(--colors-warning-background);
  `,
  error: styled.css`
    color: var(--colors-error-text);
    background-color: var(--colors-error-background);
  `,
}

export const Badge = styled.span.attrs(() => ({ 'data-module': 'Badge' }))`
  font-family: var(--font-sans);
  font-size: var(--fontSizes-tiny);
  font-weight: 600;
  padding: var(--opticalPadding);
  border-radius: var(--rounded);
  background: tertiary;
  ${({ variant }) => variants[variant]};  
`

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)),
};

Badge.defaultProps = {
  variant: 'normal',
};

export const story_Badge = () => (
  <div>
    <Badge variant="normal">Normal</Badge>
    {" "}
    <Badge variant="success">Success</Badge>
    {" "}
    <Badge variant="warning">Warning</Badge>
    {" "}
    <Badge variant="error">Error</Badge>
  </div>
)
