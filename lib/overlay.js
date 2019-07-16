import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OverlayWrap = styled.dialog`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 640px;
  height: initial;
  max-height: 85%;
  padding: var(--sizes-1);
  margin: 0;
  display: block;
  z-index: 15;
`

const OverlayContent = styled.div`
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  background: var(--colors-background);
  color: var(--colors-primary);
  font-size: var(--fontSizes-small);
  border: 2px var(--colors-primary) solid;
  border-radius: var(--rounded);
  box-shadow: pop-shadow;
  overflow: auto;
`

const Overlay = ({ children, ...props }) => (
  <OverlayWrap data-module="Overlay" {...props}>
    <OverlayContent>
      {children}
    </OverlayContent>
  </OverlayWrap>
)

// pop-shadow = 0px 2px 5px 0px rgba(0,0,0,0.27), 0px 1px 1px 0px rgba(0,0,0,0.15)

// .overlay
//   
// .section
//   margin: 0
//   padding: 14px 12px
//   color: primary
//   &:not(:last-child)
//     border-bottom: 1px solid secondary
//  &.info
//   background-color: secondary-background

// .title
//   font-size: inherit
//   font-weight: bold
//   margin: 0

// .overlayBackground
//   overflow-x: auto
//   -webkit-overflow-scrolling: touch
//   background-color: overlay-background
//   width: 100%
//   height: 100%
//   position: fixed
//   top: 0
//   left: 0
//   z-index: 10
//   cursor: default

