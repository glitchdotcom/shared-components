import React from 'react';
import styled from 'styled-components';

const loaderBackground = "black"
const loaderMoon = "#fe84d4"  // purple
loader-earth = pink // pink
loader-asteroid = MediumSpringGreen
loader-asteroid-dust = #b46bd2 // lighter purple
loader-blendmode = exclusion

.loader
  overflow: hidden
  display: inline-block
  width: 26px
  height: 26px
  position: relative
  border-radius: 200px
  background-color: loader-background
  vertical-align: middle
  margin-left: 5px
  margin-right: 15px
  transform: translate3d( 0, 0, 0);

.moon
  height: 100%
  width: 100%
  border-radius: 100px
  background-color: loader-moon
  position: absolute
  top: 50%
  margin-top: -50%
  margin-left: -50%
  animation: slideMoon 2s ease-out infinite
  mix-blend-mode: loader-blendmode

.earth
  height: 100%
  width: 100%
  border-radius: 100px
  background-color: loader-earth
  position: absolute
  top: 50%
  margin-top: -50%
  margin-left: -50%
  animation: slideEarth 3s ease-out infinite
  mix-blend-mode: loader-blendmode

.asteroid
  height: 30%
  width: 30%
  border-radius: 100px
  background-color: loader-asteroid
  position: absolute
  top: 100%
  margin-top: -50%
  margin-left: -70%
  animation: slideAsteroid 1.5s ease-in infinite
  mix-blend-mode: loader-blendmode

.asteroidDust
  height: 25%
  width: 25%
  border-radius: 100px
  background-color: loader-asteroid-dust
  position: absolute
  top: 100%
  margin-top: -70%
  margin-left: -70%
  animation: slideAsteroidDust 1.3s ease-in infinite
  mix-blend-mode: loader-blendmode

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
  <Wrap>
    <Moon/>
    <Earth/>
    <Asteroid />
    <AsteroidDust />
  </div>
);

