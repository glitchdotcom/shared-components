import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Button } from './button';
import { CodeExample, PropsDefinition, Prop } from './story-utils';

const variants = {
  normal: styled.css`
    color: var(--colors-background);
    background-color: var(--colors-secondary);
  `,
  notice: styled.css`
    color: var(--colors-notice-text);
    background-color: var(--colors-notice-background);
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
};

const BadgeBase = styled.span.attrs(() => ({ 'data-module': 'Badge' }))`
  display: inline-block;
  vertical-align: top;
  font-size: 0.75em;
  font-family: var(--font-sans);
  font-weight: 600;
  padding: 0.2em 0.375em 0.05em;
  border-radius: var(--rounded);
  white-space: nowrap;
  ${({ variant }) => variants[variant]};
  ${({ collapsed }) => collapsed && css`
    border-radius: 50%;
    vertical-align: baseline;
    height: 1em;
    width: 1em;
    padding: 0;
  `}
`;

export const Badge = ({ children, variant, collapsed, ...props }) => (
  <BadgeBase data-module="Badge" variant={variant} collapsed={collapsed} {...props}>
    {collapsed ? null : children}
  </BadgeBase>
)

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)),
  collapsed: PropTypes.bool,
};

Badge.defaultProps = {
  variant: 'normal',
  collapsed: false,
};

const Container = styled.div`
  & > * {
    margin: 0 var(--space-1) var(--space-1) 0;
  }
`;

export const StoryBadge = () => (
  <>
    <p>The Badge component renders small, highlighted inline content, e.g. search result count or a status message inside a menu button.</p>
    <CodeExample>{`<Badge variant="error">Error</Button>`}</CodeExample>
    <PropsDefinition>
      <Prop name="variant">
        The badge palette: "normal", "notice", "success", "warning", "error" (default "normal") -- see below for examples.
      </Prop>
      <Prop name="collapsed">
        Whether the badge is collapsed or not. <code>true</code> or <code>false</code> (default <code>false</code>).
      </Prop>
    </PropsDefinition>
    <h3>variant colors</h3>
    <p>(Note that the actual variant names are in lowercase.)</p>
    <Container>
      {['Normal', 'Notice', 'Success', 'Warning', 'Error'].map((label) => (
        <Badge key={label} variant={label.toLowerCase()}>
          {label}
        </Badge>
      ))}
    </Container>
    <h3>Badge sizes</h3>
    <p>Badges are fitted to the size of their surrounding text.</p>
    <h2>
      Projects <Badge>16</Badge>
    </h2>
    <p>When a badge is collapsed, only the color is visible.</p>
    <Container>
      <Button as="span" variant="secondary">
        Tools
      </Button>
      &nbsp;
      <Button as="span" variant="secondary">
        Tools <Badge variant="error">Error</Badge>
      </Button>
      &nbsp;
      <Button as="span" variant="secondary">
        Tools <Badge variant="error" collapsed>Error</Badge>
      </Button>
    </Container>
    <Container>
      <Button as="span" size="small" variant="secondary">
        Tools
      </Button>
      &nbsp;
      <Button as="span" size="small" variant="secondary">
        Tools <Badge variant="error">Error</Badge>
      </Button>
      &nbsp;
      <Button as="span" size="small" variant="secondary">
        Tools <Badge variant="error" collapsed>Error</Badge>
      </Button>
    </Container>
  </>
);
