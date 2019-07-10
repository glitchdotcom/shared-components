import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { theme } from './system';

export const BaseButton = styled.button`
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
`;

export const UnstyledButton = styled((props) => <BaseButton data-module="UnstyledButton" {...props} />)`
  display: block;
  width: 100%;
`;
UnstyledButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};
UnstyledButton.defaultProps = {
  type: 'button',
};

// Most buttons will have capital letters, but many will not have descenders.
// Even padding on buttons 
// TODO: this is font specific; should it be defined in the theme?
export const opticalPadding = `padding: 0.35em 0.5em 0.2em;`

// TODO: handle emoji positioning

const StyledButton = styled(BaseButton)`
  cursor: pointer;
  display: inline-block;
  border-radius: ${theme('rounded')};
  font-family: ${theme('fonts.sans')};
  font-size: ${theme('fontSizes.normal')};
  font-weight: 600;
  line-height: 1;
  position: relative;
  text-decoration: none;
  color: ${theme('colors.primary')};
  background-color: ${theme('colors.background')};
  ${opticalPadding};
  border: 2px solid ${theme('colors.primary')};
  white-space: nowrap;
  &:hover {
    // TODO: this is pretty clever but assumes light buttons and might not be accessible
    filter: brightness(0.9);
  }

  ${({ variant }) =>
    ({
      cta: styled.css`
        background-color: ${theme('colors.cta.background')};
        color: ${theme('colors.cta.text')};
        border-color: ${theme('colors.primary')};
        box-shadow: 4px 4px 0 ${theme('colors.primary')};
        &:active {
          background-color: ${theme('colors.cta.background')};
          box-shadow: none;
        }
      `,
      secondary: styled.css`
        color: ${theme('colors.secondary')};
        border: 1px solid ${theme('colors.primary')};
      `,
    }[variant])}

  ${({ size }) =>
    ({
      small: styled.css`
        font-size: ${theme('fontSizes.tiny')};
        padding: calc(0.35em + 1px) calc(0.5em + 1px) calc(0.2em + 1px);
        border-width: 1px;
      `,
    }[size])}
`;

StyledButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'cta']),
  size: PropTypes.oneOf(['small', 'large']),
};

StyledButton.defaultProps = {
  variant: 'primary',
  size: 'large',
};

export const Button = (props) => <StyledButton data-module="Button" {...props} />;
Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
Button.defaultProps = {
  type: 'button',
};

export const DecorativeButton = (props) => <StyledButton data-module="DecorativeButton" as="div" {...props} />;

export const LinkButton = (props) => <StyledButton data-module="LinkButton" as="a" {...props} />;
LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
};

const Wrap = styled.div`
  margin: ${theme('space.2')};
  > * {
    margin-right: ${theme('space.2')};
  }
`;

const Block = styled(UnstyledButton)`
  border-radius: ${theme('rounded')};
  background-color: ${theme('colors.secondaryBackground')};
  padding: ${theme('space.2')};
  width: 300px;
`;

export const story_Button = () => {
  const onClick = () => console.log('clicked');

  return (
    <div>
      <Wrap>
        <Button onClick={onClick}>Normal</Button>
        <Button variant="secondary" onClick={onClick}>
          Secondary
        </Button>
        <Button variant="cta" onClick={onClick}>
          CTA
        </Button>
      </Wrap>
      <Wrap>
        <Button size="small" onClick={onClick}>
          Normal Small
        </Button>
        <Button size="small" variant="secondary" onClick={onClick}>
          Secondary Small
        </Button>
        <Button size="small" variant="cta" onClick={onClick}>
          CTA Small
        </Button>
      </Wrap>
      <Wrap>
        <Block onClick={onClick}>
          <DecorativeButton>power-passenger</DecorativeButton>
          <p>take 2 on glitch component library</p>
        </Block>
      </Wrap>
    </div>
  );
};
