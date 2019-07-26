import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from './icon';
import { sizes } from './system';

// TODO: Does it make any sense for buttons to have an "inline" size that matches their context?

const BaseButton = styled.button`
  appearance: none;
  color: inherit;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  text-transform: none;
  text-align: left;
  cursor: pointer;
`;
BaseButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};
BaseButton.defaultProps = {
  type: 'button',
};

const StyledButton = styled.span`
  display: inline-block;
  border-radius: var(--rounded);
  font-family: var(--fonts-sans);
  font-weight: 600;
  line-height: 1;
  position: relative;
  padding: var(--opticalPadding);
  white-space: nowrap;
  text-decoration: none;

  ${({ variant }) => variants[variant]}
  ${({ size }) => sizes[size]}
`;

const variants = {
  primary: styled.css`
    color: var(--colors-primary);
    background-color: var(--colors-background);
    border: 2px solid var(--colors-primary);
    &:hover,
    &:active {
      background-color: var(--colors-secondaryBackground);
    }
  `,
  secondary: styled.css`
    color: var(--colors-secondary);
    background-color: var(--colors-background);
    border: 1px solid var(--colors-secondary);
    &:hover,
    &:active {
      background-color: var(--colors-secondaryBackground);
    }
  `,
  shadow: styled.css`
    color: var(--colors-primary);
    background-color: var(--colors-background);
    border: 2px solid var(--colors-primary);
    &:hover,
    &:active {
      background-color: var(--colors-secondaryBackground);
      box-shadow: 4px 4px 0 var(--colors-primary);
    }
  `,
  cta: styled.css`
    color: var(--colors-cta-primary);
    background-color: var(--colors-cta-background);
    border: 2px solid var(--colors-primary);
    box-shadow: 4px 4px 0 var(--colors-primary);
    &:hover,
    &:active {
      background-color: var(--colors-secondaryBackground);
      box-shadow: 2px 2px 0 var(--colors-primary);
    }
  `,
  warning: styled.css`
    color: var(--colors-secondary);
    background-color: var(--colors-background);
    border: 1px solid var(--colors-secondary);
    &:hover,
    &:active {
      color: vaqr(--colors-warning-text);
      background-color: var(--colors-warning-background);
    }
  `
};

export const UnstyledButton = styled(BaseButton).attrs(() => ({ 'data-module': 'UnstyledButton' }))``;
export const Button = styled(StyledButton).attrs(() => ({ 'data-module': 'Button' }))``;

Button.propTypes = {
  variant: PropTypes.oneOf(Object.keys(variants)),
  size: PropTypes.oneOf(Object.keys(sizes)),
};
Button.defaultProps = {
  variant: 'primary',
  size: 'normal',
  as: BaseButton,
};

const Container = styled.div`
  & > * {
    margin: 0 var(--space-1) var(--space-1) 0;
  }
`;

export const StoryButton = () => (
  <>
    <Container>
      {['Primary', 'Secondary', 'Shadow', 'CTA', 'Warning'].map((label) => (
        <Button key={label} variant={label.toLowerCase()} onClick={() => console.log(`clicked ${label}`)}>
          {label}
        </Button>
      ))}
    </Container>
    <Container>
      {['Tiny', 'Small', 'Normal', 'Big', 'Bigger', 'Huge'].map((label) => (
        <Button key={label} size={label.toLowerCase()} onClick={() => console.log(`clicked ${label}`)}>
          {label}
        </Button>
      ))}
    </Container>
  </>
);

const Box = styled.span`
  display: block;
  border-radius: var(--rounded);
  color: var(--colors-tertiary-text);
  background-color: var(--colors-tertiary-background);
  padding: var(--space-1);
`

export const StoryButton_in_button = () => (
  <Box as={UnstyledButton} onClick={() => console.log('clicked')}>
    <Button as="span" variant="shadow">blob-papa</Button>
    <p>A blobby project that does papa things</p>
  </Box>
)

export const StoryButton_with_Icon = () => (
  <>
    <Container>
      <Button as="span">No Icon</Button>
      <Button as="span">
        View 8 Projects <Icon icon="arrowRight" />
      </Button>
      <Button as="span">
        Add Project <Icon icon="bentoBox" />
      </Button>
      <Button as="span" variant="warning" size="tiny">
        Delete blob-papa <Icon icon="bomb" />
      </Button>
    </Container>
  </>
);

