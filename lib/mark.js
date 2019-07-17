import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MarkWrap = styled.span`
  display: inline-block;
  transform: rotate(-1deg);
  position: relative;
  left: -0.3125em;
  z-index: 0;
  background-color: var(--mark-color);
  padding: 0.3125em 0.625em;
  border-radius: var(--rounded);
`
const MarkText = styled.span`
  position: relative;
  display: inline-block;
  transform: rotate(1deg);
`

export const Mark = ({ color, children, ...props }) => (
  <MarkWrap data-module="Mark" style={{ '--mark-color': color }} {...props}>
    <MarkText>{children}</MarkText>
  </MarkWrap>
);

export const story_Mark = () => (
  <>
    
  <>
)