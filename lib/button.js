import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from './icon';
import { sizes, variantColors } from './system';
import { withProps } from './util';

import { P } from './text';
import { Box } from './box';

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
      background-color: var(--colors-hover);
    }
  `,
  secondary: styled.css`
    color: var(--colors-secondary);
    background-color: var(--colors-background);
    border: 1px solid var(--colors-secondary);
    &:hover,
    &:active {
      background-color: var(--colors-hover);
    }
  `,
  cta: styled.css`
    ${variantColors.cta};
    border: 2px solid var(--colors-primary);
    box-shadow: 4px 4px 0 var(--colors-primary);
    &:hover,
    &:active {
      background-color: var(--colors-cta-hover);
      box-shadow: none;
    }
  `,
};

export const UnstyledButton = withProps(BaseButton, { 'data-module': 'UnstyledButton' });

export const Button = withProps(StyledButton, { 'data-module': 'Button' });
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

export const StoryButton = () => {
  const onClick = () => console.log('clicked');

  return (
    <>
      <Container>
        {['Primary', 'Secondary', 'CTA'].map((label) => (
          <Button key={label} variant={label.toLowerCase()} onClick={onClick}>
            {label}
          </Button>
        ))}
      </Container>
      <Container>
        {['Tiny', 'Small', 'Normal', 'Big', 'Bigger', 'Huge'].map((label) => (
          <Button key={label} size={label.toLowerCase()} onClick={onClick}>
            {label}
          </Button>
        ))}
      </Container>
      <Container>
        <UnstyledButton onClick={onClick}>
          <Box rounded variant="highlight" padding={1}>
            <Button as="span">blob-papa</Button>
            <p>take 2 on glitch component library</p>
          </Box>
        </UnstyledButton>
      </Container>
    </>
  );
};

export const StoryButton_with_Icon = () => (
  <>
    <Container>
      <Button as="span">No Icon</Button>
      <Button as="span">
        View 8 Projects <Icon icon="arrowRight" />
      </Button>
      <Button as="span">
        View 8 Projects <Icon icon="arrowRight" />
      </Button>
      <Button as="span">
        Show <Icon icon="arrowRight" />
      </Button>
    </Container>
  </>
);

const IconButtonWrap = styled.span`
  padding: var(--opticalPadding);
  border-radius: var(--rounded);
  display: inline-block;
  line-height: 1;
  ${({ size }) => sizes[size]}
  &:hover {
    background-color: var(--colors-hover);
  }
`;
const ButtonIcon = styled(Icon)`
  color: var(--colors-secondary);
  &:hover {
    color: var(--colors-primary);
  }
`;

//
export const IconButton = React.forwardRef(({ icon, label, size, iconProps, ...props }, ref) => (
  <IconButtonWrap data-module="IconButton" aria-label="label" ref={ref} size={size} {...props}>
    <ButtonIcon icon={icon} {...iconProps} />
  </IconButtonWrap>
));

IconButton.propTypes = {
  //icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(sizes)),
  iconProps: PropTypes.object,
  type: PropTypes.string,
};
IconButton.defaultProps = {
  type: 'button',
  size: 'normal',
  as: UnstyledButton,
};

const noop = () => {};
export const StoryIconButton = () => (
  <>
    <IconButton icon="x" label="Close notification" onClick={noop} />
    &nbsp;
    <IconButton icon="chevronDown" label="Project options" onClick={noop} />
  </>
);
