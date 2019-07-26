import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MarkWrap = styled.span`
  display: inline-block;
  transform: rotate(-1deg);
  position: relative;
  left: calc(var(--rounded) * -1);
  z-index: 0;
  color: var(--text-color);
  background-color: var(--mark-color);
  padding: var(--rounded) calc(var(--rounded) * 2);
  border-radius: var(--rounded);
`;
const MarkText = styled.span`
  position: relative;
  display: inline-block;
  transform: rotate(1deg);
`;

export const Mark = ({ color, textColor, children, ...props }) => (
  <MarkWrap data-module="Mark" style={{ '--mark-color': color, '--text-color': textColor }} {...props}>
    <MarkText>{children}</MarkText>
  </MarkWrap>
);
Mark.propTypes = {
  color: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};
Mark.defaultProps = {
  textColor: '#222',
};

const CodeExample = styled.div`
  font-family: var(--fonts-mono);
  font-size: var(--fontSizes-big);
  background-color: var(--colors-secondaryBackground);
  padding: var(--space-2);
`;

export const StoryMark = () => (
  <>
    <p>The Mark component renders dark text with a colorful background stripe that resembles a highlighter.</p>
    <CodeExample>{`<Mark color="yellow">Spark your next project</Mark>`}</CodeExample>
    <h3>props</h3>
    <dl>
      <dt>
        color <em>(required)</em>
      </dt>
      <dd>The color of the background strip, in any CSS color format.</dd>
      <dt>textColor</dt>
      <dd>
        The text color, defaulting to #222. Note that text color is <em>not</em> inherited from the theme.
      </dd>
    </dl>
    <h1>
      <Mark color="yellow">Spark your next project</Mark>
    </h1>
    <h2>
      <Mark color="pink">Just start typing</Mark>
    </h2>
    <h3>
      <Mark color="teal" textColor="white">
        Code together
      </Mark>
    </h3>
  </>
);
