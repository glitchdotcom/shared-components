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
  font-weight: 600;
  line-height: 1;
  position: relative;
  text-align: left;
  text-decoration: none;
  color: #222;
  background-color: #FFF;
  padding-top: 6px;
  padding-bottom: 5px;
  border: 2px solid #222;
  font-size: 12px;
  
  ${({ buttonType }) => ({
    cta: styled.css`
      background-color: #83ffcd;
      box-shadow: 4px 4px 0 #222;
    `,
    secondary: styled.css`
      color: #727272;
      padding-top: 7px;
      padding-bottom: 6px;
      border: 1px solid #B8B8B8;
    `,
  })[buttonType]}

  ${({ size }) => ({
    small: styled.css`
      font-size: 14px;
      padding-top: 5px;
      padding-bottom: 3px;
      border-width: 1px;
    `,
  })[size]}
`;

StyledButton.propTypes = {
  children: PropTypes.isRequired,
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

export const story_Button = () => (
  <div>
    <
  
  </div>
) 