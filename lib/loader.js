import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { sizes } from './system';

const sizeOptions = {
  ...sizes,
  inline: `
    width: 0.75em;
    height: 0.75em;
  `,
};

const Container = styled.span`
  overflow: hidden;
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  position: relative;
  border-radius: 100%;
  background-color: #000;
  transform: translate3d(0, 0, 0);
  ${({ size }) => sizeOptions[size || "inline"]}
`;

const Circle = styled.span`
  position: absolute;
  mix-blend-mode: exclusion;
  height: var(--diameter);
  width: var(--diameter);
  border-radius: 100%;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
  // TODO: is there something we can do to indicate this is a loader when this is active?
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Moon = styled(Circle)`
  --diameter: 100%;
  background-color: #fe84d4;
  top: 50%;
  margin-top: -50%;
  margin-left: -50%;
  animation-duration 2s;
  animation-name: ${styled.keyframes`
    from {
      left: -40%;
    }
    to {
      left: 145%;
    }
  `};
`;

const Earth = styled(Circle)`
  --diameter: 100%;
  background-color: pink;
  top: 50%;
  margin-top: -50%;
  margin-left: -50%;
  animation-duration: 3s;
  animation-name: ${styled.keyframes`
    from {
      left: -60%;
    }
    to {
      left: 145%;
    }
  `};
`;
const Asteroid = styled(Circle)`
  --diameter: 30%;
  background-color: MediumSpringGreen;
  top: 100%;
  margin-top: -50%;
  margin-left: -70%;
  animation-duration: 1.5s;
  animation-name: ${styled.keyframes`
    from {
      left: -70%;
    }
    to {
      left: 170%;
    }
  `};
`;

const AsteroidDust = styled(Circle)`
  --diameter: 25%;
  background-color: #b46bd2;
  top: 100%;
  margin-top: -70%;
  margin-left: -70%;
  animation-duration: 1.3s;
  animation-name: ${styled.keyframes`
    from {
      left: -55%;
    }
    to {
      left: 170%;
    }
  `};
`;

export const Loader = (props) => (
  <Container data-module="Loader" {...props}>
    <Moon />
    <Earth />
    <Asteroid />
    <AsteroidDust />
  </Container>
);
Loader.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizeOptions)),
}
Loader.defaultProps = {
  size: "normal",
}

const CodeExample = styled.div`
  font-family: var(--fonts-mono);
  font-size: var(--fontSizes-big);
  background-color: var(--colors-secondaryBackground);
  padding: var(--space-2);
`;

export const StoryLoader = () => (
  <>
    <p>The Loader component renders an inline loading indicator.</p>
    <CodeExample>{`<Loader size="huge" />`}</CodeExample>
    <h3>props</h3>
    <dl>
      <dt>size</dt>
      <dd>
        The size of the loader: "tiny", "small", "normal", "big", "bigger", or "huge" for fixed sizes, or "inline" to fit in its surrounding text.
        Defaults to "normal".
      </dd>
    </dl>
  </>
)

export const StoryLoader_sizes = () => (
  <>
    <p>
      Icon sizes are configurable with the "size" property, which scale 1.5x to the theme's font sizes.
    </p>
    <Loader size="tiny"/>
    &nbsp;
    <Loader size="small"/>
    &nbsp;
    <Loader size="normal"/>
    &nbsp;
    <Loader size="big"/>
    &nbsp;
    <Loader size="bigger"/>
    &nbsp;
    <Loader size="huge"/>
    &nbsp;
    <p>
      Loaders with the size "inline" match the size of their surrounding text.
    </p>
    <h2>
      <Loader size="inline"/> Loading…
    </h2>
    <p>
      <Loader size="inline"/> Loading…
    </p>
    <h6>
      <Loader size="inline"/> Loading…
    </h6>
  </>
);
