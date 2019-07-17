import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO: share with button
const opticalPadding = `padding: calc(0.35em + 1px) 0.5em 0.2em;`;

const variants = {
  normal: styled.css`
    color: var(--colors-background);
    backgroundColor: var(--colors-primary);
  `,
  success: styled.css`
    color: var(--colors-success-text);
    backgroundColor: var(--colors-error-success);
  `,
  warning: styled.css`
    color: var(--colors-warning-text);
    backgroundColor: var(--colors-error-warning);
  `,
  error: styled.css`
    color: var(--colors-error-text);
    backgroundColor: var(--colors-error-background);
  `,
}

export const Badge = styled.span.attrs(() => ({ 'data-module': 'Badge' }))`
  font-family: var(--font-sans);
  font-size: var(--fontSizes-tiny);
  font-weight: 600;
  ${opticalPadding};
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
