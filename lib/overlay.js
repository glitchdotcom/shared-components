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

const OverlayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: auto;
  width: 100%;
  height: 100%;
  cursor: default;
  -webkit-overflow-scrolling: touch;
  background-color: var(--colors-background);
  opacity: 0.5;
`

const OverlayContent = styled.div`
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  background: var(--colors-background);
  color: var(--colors-primary);
  font-size: var(--fontSizes-small);
  border: 2px var(--colors-primary) solid;
  border-radius: var(--rounded);
  box-shadow: var(--pop-shadow);
  overflow: auto;
`

const useFocusTrap = () => {
  const first = React.useRef()
  const last = React.useRef()
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Tab' && e.target === last.current) {
        e.preventDefault()
        first.current.focus()
      }
      if (e.key === 'Tab' && e.shiftKey && e.target === first.current) {
        e.preventDefault()
        last.current.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  return { first, last }
}

// https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
const Overlay = ({ onClose, children, ...props }) => {
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { onClose(e) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <OverlayWrap data-module="Overlay" open aria-modal={true} {...props}>
      <OverlayBackground onClick={onClose} />
      <OverlayContent>
        {children}
      </OverlayContent>
    </OverlayWrap>
  )
}

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



