import React from 'react';
import styled from 'styled-components';

const backgroundColor = "black"
const moonColor = "#fe84d4"  // purple
const earthColor = "pink" // pink
const asteroidColor = "MediumSpringGreen"
const asteroidDustColor = "#b46bd2" // lighter purple
const blendMode = "exclusion"

const Container = styled.div`
  overflow: hidden;
  display: inline-block;
  width: 26px;
  height: 26px;
  position: relative;
  border-radius: 200px;
  background-color: ${backgroundColor};
  vertical-align: middle;
  margin-left: 5px;
  margin-right: 15px;
  transform: translate3d( 0, 0, 0);
`

const Circle = styled.div`
  position: absolute;
  mix-blend-mode: exclusion;
  height: var(--diameter);
  width: var(--diameter);
  border-radius: 100%;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
`

const Moon = styled(Circle)`
  --diameter: 100%;
  background-color: ${moonColor};
  top: 50%;
  margin-top: -50%;
  margin-left: -50%;
  animation-duration: 2s;
  animation: slideMoon 2s;
`

const Earth = styled(Circle)`
  --diameter: 100%;
  background-color: ${earthColor};
  top: 50%;
  margin-top: -50%;
  margin-left: -50%;
  animation-duration: 3s;
  animation: slideEarth 3s;
`
const Asteroid = styled(Circle)`
  --diameter: 30%;
  background-color: ${asteroidColor};
  top: 100%;
  margin-top: -50%;
  margin-left: -70%;
  animation-duration: 1.5s;
  animation: slideAsteroid 1.5s;
`

const Dust = styled(Circle)`
  --diameter: 25%;
  background-color: ${asteroidDustColor};
  top: 100%;
  margin-top: -70%;
  margin-left: -70%;
  animation-duration: 1.3s;
  animation: slideAsteroidDust 1.3s;
`

@keyframes slideMoon
  from
    left: -40%
  to
    left: 145%

@keyframes slideEarth
  from
    left: -60%
  to
    left: 145%

@keyframes slideAsteroid
  from
    left: -70%
  to
    left: 150%

@keyframes slideAsteroidDust
  from
    left: -55%
  to
    left: 150%



export const Loader = () => (
  <Container>
    <Moon/>
    <Earth/>
    <Asteroid />
    <AsteroidDust />
  </Container>
);

