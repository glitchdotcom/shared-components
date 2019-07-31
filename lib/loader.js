import React from 'react';
import styled, { keyframes } from 'styled-components';
import { CodeExample } from './story-utils';

const Container = styled.span`
  display: inline-block;
  width: 0.75em;
  height: auto;
  object-fit: contain;
`;

const Mask = styled.span`
  overflow: hidden;
  display: inline-block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  border-radius: 100%;
  background-color: #000;
  transform: translate3d(0, 0, 0);
`;

const Circle = styled.span`
  position: absolute;
  mix-blend-mode: exclusion;
  height: var(--diameter);
  width: var(--diameter);
  border-radius: 100%;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
`;

const Earth = styled(Circle)`
  @media (prefers-reduced-motion: reduce) {
    margin-left: 0;
    animation-direction: alternate;
    animation-name: ${keyframes`
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    `};
  }
  --diameter: 100%;
  background-color: pink;
  top: 50%;
  margin-top: -50%;
  margin-left: -50%;
  animation-duration: 3s;
  animation-name: ${keyframes`
    from {
      left: -60%;
    }
    to {
      left: 145%;
    }
  `};
`;

const Moon = styled(Circle)`
  @media (prefers-reduced-motion: reduce) {
    display: none
  }
  --diameter: 100%;
  background-color: #fe84d4;
  top: 50%;
  margin-top: -50%;
  margin-left: -50%;
  animation-duration 2s;
  animation-name: ${keyframes`
    from {
      left: -40%;
    }
    to {
      left: 150%;
    }
  `};
`;

const Asteroid = styled(Circle)`
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
  --diameter: 30%;
  background-color: MediumSpringGreen;
  top: 100%;
  margin-top: -50%;
  margin-left: -70%;
  animation-duration: 1.5s;
  animation-name: ${keyframes`
    from {
      left: -70%;
    }
    to {
      left: 170%;
    }
  `};
`;

const AsteroidDust = styled(Circle)`
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
  --diameter: 25%;
  background-color: #b46bd2;
  top: 100%;
  margin-top: -70%;
  margin-left: -70%;
  animation-duration: 1.3s;
  animation-name: ${keyframes`
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
    <Mask>
      <Moon />
      <Earth />
      <Asteroid />
      <AsteroidDust />
    </Mask>
  </Container>
);

export const StoryLoader = () => (
  <>
    <p>The Loader component renders an inline loading indicator. Loaders have no component-specific props.</p>
    <CodeExample>{`<Loader />`}</CodeExample>
    <p>By default, loaders match the size of their surrounding text.</p>
    <h2>
      <Loader /> Loading…
    </h2>
    <p>
      <Loader /> Loading…
    </p>
    <h6>
      <Loader /> Loading…
    </h6>
    <p>Loader sizes can be overridden with css classes, inline styles, or styled components.</p>
    <CodeExample>{`<Loader style={{ width: '200px' }} />`}</CodeExample>
    <Loader style={{ width: '200px' }} />
  </>
);
