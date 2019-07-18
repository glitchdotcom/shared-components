import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { icons, Icon } from './icon';

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

export const UnstyledButton =(props) => <BaseButton data-module="UnstyledButton" {...props} />;
UnstyledButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};
UnstyledButton.defaultProps = {
  type: 'button',
};

const StyledButton = styled(BaseButton)`
  display: inline-block;
  border-radius: var(--rounded);
  font-family: var(--fonts-sans);
  font-weight: 600;
  line-height: 1;
  position: relative;
  text-decoration: none;
  padding: var(--opticalPadding);
  white-space: nowrap;

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
    color: var(--colors-cta-text);
    background-color: var(--colors-cta-background);
    border: 2px solid var(--colors-primary);
    box-shadow: 4px 4px 0 var(--colors-primary);
    &:hover,
    &:active {
      background-color: var(--colors-cta-hover);
      box-shadow: none;
    }
  `,
};

const sizes = {
  large: styled.css`
    font-size: var(--fontSizes-normal);
  `,
  small: styled.css`
    font-size: var(--fontSizes-tiny);
  `,
};

StyledButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)),
  size: PropTypes.oneOf(Object.keys(sizes)),
};

StyledButton.defaultProps = {
  variant: 'primary',
  size: 'large',
};

export const Button = React.forwardRef((props, ref) => <StyledButton data-module="Button" {...props} ref={ref} />);
Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
Button.defaultProps = {
  type: 'button',
};

export const DecorativeButton = (props) => <StyledButton data-module="DecorativeButton" as="span" {...props} />;

export const LinkButton = React.forwardRef((props, ref) => <StyledButton data-module="LinkButton" as="a" {...props} ref={ref} />);
LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
};

const Wrap = styled.div`
  margin-bottom: var(--space-2);
  > * {
    margin-right: var(--space-2);
  }
`;

const Block = styled(UnstyledButton)`
  display: block;
  border-radius: var(--rounded);
  background-color: var(--colors-secondaryBackground);
  padding: var(--space-2);
  width: 300px;
`;

export const StoryButton = () => {
  const onClick = () => console.log('clicked');

  return (
    <>
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
          <DecorativeButton>blob-papa</DecorativeButton>
          <p>take 2 on glitch component library</p>
        </Block>
      </Wrap>
    </>
  );
};

const Container = styled.div`
  & > * {
    margin: 0 var(--space-1) var(--space-1) 0;
  }
`;

export const StoryButton_with_Icon = () => (
  <>
    <Container>
      <Button onClick={() => console.log(null)}>No Icon</Button>
      {Object.keys(icons).map((icon) => (
        <Button key={icon} onClick={() => console.log(icon)}>
          {icon} <Icon icon={icon} />
        </Button>
      ))}
    </Container>
    <Container>
      <Button size="small" variant="secondary" onClick={() => console.log(null)}>
        No Icon
      </Button>
      {Object.keys(icons).map((icon) => (
        <Button key={icon} size="small" variant="secondary" onClick={() => console.log(icon)}>
          {icon} <Icon icon={icon} />
        </Button>
      ))}
    </Container>
  </>
);
