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
// As a result, even padding on buttons frequently looks unbalanced,
// so we apply extra padding to the top to correct this.
// TODO: this is font specific; should it be defined in the theme?
const opticalPadding = `padding: calc(0.35em + 1px) 0.5em 0.2em;`;

const IconButtonWrap = styled(BaseButton)`
  padding: 2px 2px 0px;
  border-radius: var(--rounded);
  display: inline-block;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const IconButton = React.forwardRef(({ icon, label, ...props }, ref) => (
  <IconButtonWrap data-module="IconButton" ref={ref} {...props}>
    <Icon icon={icon} alt={label} />
  </IconButtonWrap>
));

const StyledButton = styled(BaseButton)`
  display: inline-block;
  border-radius: var(--rounded);
  font-family: var(--fonts-sans);
  font-size: var(--fontSizes-normal);
  font-weight: 600;
  line-height: 1;
  position: relative;
  text-decoration: none;
  color: var(--colors-primary);
  background-color: var(--colors-background);
  ${opticalPadding};
  border: 2px solid var(--colors-primary);
  white-space: nowrap;
  &:hover,
  &:active {
    background-color: var(--colors-hover);
  }

  ${({ variant }) =>
    ({
      cta: styled.css`
        background-color: var(--colors-cta-background);
        color: var(--colors-cta-text);
        border-color: var(--colors-primary);
        box-shadow: 4px 4px 0 var(--colors-primary);
        &:hover,
        &:active {
          background-color: var(--colors-cta-hover);
          box-shadow: none;
        }
      `,
      secondary: styled.css`
        color: var(--colors-secondary);
        border: 1px solid var(--colors-primary);
      `,
    }[variant])}

  ${({ size }) =>
    ({
      small: styled.css`
        font-size: var(--fontSizes-tiny);
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
  margin: var(--space-2);
  > * {
    margin-right: var(--space-2);
  }
`;

const Block = styled(UnstyledButton)`
  border-radius: var(--rounded);
  background-color: var(--colors-secondaryBackground);
  padding: var(--space-2);
  width: 300px;
`;

export const story_Button = () => {
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
  margin: 0.5em;
  & > * {
    margin: 0.5em;
  }
`;

export const story_Button_with_Icon = () => (
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
