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

export const TransparentButton = styled(BaseButton)`
  display: block;
  width: 100%;
`;

// TODO: use theme colors/sizes

const smallStyles = styled.css`
  padding-top: 5px;
  padding-bottom: 3px;
  border-width: 1px;
`;

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
    sm
  })}
`;

export const LinkButton = (props) => <Button as="a" {...props} />;
