import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BaseButton = styled.button.attrs((props) => ({
  type: props.type || 'button',
}))`
  appearance: none;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  text-transform: none;
`;

export const UnstyledButton = styled(BaseButton)`
  display: block;
  width: 100%;
`;

// TODO: use theme colors/sizes
// TODO: handle emoji positioning

const StyledButton = styled(BaseButton)`
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
  font-family: "Benton Sans", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  position: relative;
  text-align: left;
  text-decoration: none;
  color: #222;
  background-color: #FFF;
  padding: 6px 8px 5px;
  border: 2px solid #222;
  &:active {
    background-color: #e5e5e5;
  }
  
  ${({ buttonType }) => ({
    cta: styled.css`
      background-color: #83ffcd;
      box-shadow: 4px 4px 0 #222;
      &:active {
        background-color: #83ffcd;
        
      }
    `,
    secondary: styled.css`
      color: #727272;
      padding: 7px 8px 6px;
      border: 1px solid #B8B8B8;
    `,
  })[buttonType]}

  ${({ size }) => ({
    small: styled.css`
      font-size: 14px;
      padding: 5px 6px 3px;
      border-width: 1px;
    `,
  })[size]}
`;

StyledButton.propTypes = {
  children: PropTypes.node.isRequired,
  buttonType: PropTypes.oneOf(['primary', 'secondary', 'cta']),
  size: PropTypes.oneOf(['small', 'large']),
};

StyledButton.defaultProps = {
  buttonType: 'primary',
  size: 'large',
};

export const Button = (props) => <StyledButton {...props} />;
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const DecorativeButton = (props) => <StyledButton as="div" {...props} />;

export const LinkButton = (props) => <StyledButton as="a" {...props} />;
LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
};

const Wrap = styled.div`
  margin: 1rem;
  > * {
    margin-right: 1rem;
  }
`;

export function story_Button () {
  const onClick = () => console.log('clicked');

  return (
    <div>
      <Wrap>
        <Button onClick={onClick}>Normal</Button>
        <Button buttonType="secondary" onClick={onClick}>Secondary</Button>
        <Button buttonType="cta" onClick={onClick}>CTA</Button>
      </Wrap>
      <Wrap>
        <Button size="small" onClick={onClick}>Normal Small</Button>
        <Button size="small" buttonType="secondary" onClick={onClick}>Secondary Small</Button>
        <Button size="small" buttonType="cta" onClick={onClick}>CTA Small</Button>
      </Wrap>
    </div>
  );  
}
