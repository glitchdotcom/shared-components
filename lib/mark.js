import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MarkWrap = styled.span`
  display: inline-block;
  transform: rotate(-1deg);
  position: relative;
  left: calc(var(--rounded) * -1);
  z-index: 0;
  background-color: var(--mark-color);
  padding: var(--rounded) calc(var(--rounded) * 2);
  border-radius: var(--rounded);
`;
const MarkText = styled.span`
  position: relative;
  display: inline-block;
  transform: rotate(1deg);
`;

export const Mark = ({ color, children, ...props }) => (
  <MarkWrap data-module="Mark" style={{ '--mark-color': color }} {...props}>
    <MarkText>{children}</MarkText>
  </MarkWrap>
);
Mark.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const StoryMark = () => (
  <>
    <h1>
      <Mark color="yellow">Spark your next project</Mark>
    </h1>
    <h2>
      <Mark color="pink">Just start typing</Mark>
    </h2>
    <h3>
      <Mark color="aquamarine">Code together</Mark>
    </h3>
  </>
);
