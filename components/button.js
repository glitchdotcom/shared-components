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
const normal = styled.css`
  color: #222;
  background-color: #FFF;
  border: 2px solid #222;
`;

const secondary = styled.css`
  color: #727272;
  background-color: #FFF;
  border: 1px solid #B8B8B8;
`

const cta = styled.css`
  color: #222;
  background-color: #83ffcd;
  border: 2px solid #222;
`;

const shadow = styled.css`
  box-shadow: 4px 4px 0 #222;
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
`;

export const LinkButton = (props) => <Button as="a" {...props} />;
