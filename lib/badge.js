import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variantColors } from './system';
import { Button } from './button';
import { CodeExample } from './story-utils';

const variants = {
  normal: styled.css`
    color: var(--colors-background);
    background-color: var(--colors-secondary);
  `,
  notice: variantColors.notice,
  success: variantColors.success,
  warning: variantColors.warning,
  error: variantColors.error,
};

export const Badge = styled.span.attrs(() => ({ 'data-module': 'Badge'}))`
  display: inline-block;
  vertical-align: top;
  font-size: 0.66em;
  font-family: var(--font-sans);
  font-weight: 600;
  margin: -0.1em 0;
  padding: var(--opticalPadding);
  border-radius: var(--rounded);
  white-space: nowrap;
  ${({ variant }) => variants[variant]};
`

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)),
};

Badge.defaultProps = {
  variant: 'normal',
};

const Container = styled.div`
  & > * {
    margin: 0 var(--space-1) var(--space-1) 0;
  }
`;

export const StoryBadge = () => (
  <>
    <p>The Badge component renders small, highlighted content, to use inside buttons or similar components</p>
    <CodeExample>{`<Badge variant="error">Error</Button>`}</CodeExample>
    <h3>props</h3>
    <dl>
      <dt>variant</dt>
      <dd>The badge palette: "normal", "notice", "success", "warning", "error" (default "normal") -- see below for examples.</dd>
    </dl>
    <p>(Note that the actual variant names are in lowercase.)</p>
    <Container>
      {['Normal', 'Notice', 'Success', 'Warning', 'Error'].map((label) => (
        <Badge key={label} variant={label.toLowerCase()}>
          {label}
        </Badge>
      ))}
    </Container>
  </>
);


export const StoryBadge_sizes = () => (
  <>
    <p>By default, badges are fitted to the size of their surrounding text.</p>
    <h2>Projects <Badge>16</Badge></h2>
    <Container>
      <Button as="span" variant="secondary">Tools</Button>
      &nbsp;
      <Button as="span" variant="secondary">Tools <Badge variant="error">Error</Badge></Button>
    </Container>
    <Container>
      <Button as="span" size="small" variant="secondary">Tools</Button>
      &nbsp;
      <Button as="span" size="small" variant="secondary">Tools <Badge variant="error">Error</Badge></Button>
    </Container>
  </>
);

