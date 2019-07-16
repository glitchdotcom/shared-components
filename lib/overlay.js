import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

@import '../constants.styl'

pop-shadow = 0px 2px 5px 0px rgba(0,0,0,0.27), 0px 1px 1px 0px rgba(0,0,0,0.15)

.overlay
  -webkit-tap-highlight-color: rgba(0,0,0,0)
  background: primary-background
  color: primary
  font-size: 14px
  border: 2px primary solid
  border-radius: 5px
  width: 94%
  max-width: 640px
  max-height: 85%
  height: initial
  display: block
  position: fixed
  left: 50%
  transform: translateX(-50%)
  top: 6.5%
  padding: 0
  margin: 0
  box-shadow: pop-shadow
  z-index: 15
  overflow: auto

.section
  margin: 0
  padding: 14px 12px
  color: primary
  &:not(:last-child)
    border-bottom: 1px solid secondary
 &.info
  background-color: secondary-background

.title
  font-size: inherit
  font-weight: bold
  margin: 0

.overlayBackground
  overflow-x: auto
  -webkit-overflow-scrolling: touch
  background-color: overlay-background
  width: 100%
  height: 100%
  position: fixed
  top: 0
  left: 0
  z-index: 10
  cursor: default

