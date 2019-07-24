import React from 'react';
import styled from 'styled-components';
import { sizes } from './system';

const Container = styled.div`
  overflow: hidden;
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  position: relative;
  border-radius: 100%;
  background-color: #000;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
  ${({ size }) => sizes[size]}
`;

const Circle = styled.div`
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

export const StoryLoader = () => (
  <>
    <Loader />
    &nbsp;
    <Loader size="tiny" />
    &nbsp;
    <Loader size="huge" />
  </>
);
