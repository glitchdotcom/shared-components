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

const largeButton = styled.css`
  font-size: var(--text-4);
  padding: var(--u1) var(--u2);
`;


const StyledButton = styled(BaseButton)`
  background-color: var(--primary-background);
  border: solid var(--primary) 2px;
  border-radius: var(--u1);
  color: var(--primary);
  cursor: pointer;
  display: inline-block;
  font-family: var(--sansserif);
  font-weight: 600;
  line-height: 1;
  position: relative;
  text-align: left;
  text-decoration: none;
  
`;

export const LinkButton = (props) => <Button as="a" {...props} />;
