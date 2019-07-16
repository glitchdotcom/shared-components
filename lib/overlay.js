import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './button';

const OverlayWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: var(--space-4) var(--space-1);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
  background-color: rgba(255,255,255,0.5);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`

const OverlayContent = styled.dialog`
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0;
  padding: 0;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  background-color: var(--colors-background);
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
      if (e.key === 'Tab' && !e.shiftKey && e.target === last.current) {
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

const useFocusOnMount = () => {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current.focus()
  }, [])
  return ref
}

const useEscape = (onClose) => {
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { onClose(e) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
}

// https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
export const Overlay = ({ onClose, children, ...props }) => {
  useEscape(onClose)
  const { first, last } = useFocusTrap()
  const focusedOnMount = useFocusOnMount()
  
  const onClickBackground = (e) => {
    if (e.currentTarget === e.target) {
      onClose(e);
    }
  } 
  
  return (
    <OverlayWrap data-module="Overlay" onClick={onClickBackground} {...props}>
      <OverlayContent open aria-modal={true}>
        {children({ onClose, first, last, focusedOnMount })}
      </OverlayContent>
    </OverlayWrap>
  )
}

const OverlayTitleWrap = styled.h2`
  display: flex;
  font-size: var(--fontSizes-big);
  margin: 0;
  padding: var(--space-1);
`
const OverlayTitleContent = styled.span`
  flex: 1 0 auto;
`

const IconButton = styled.button`
  flex: 0 0 auto;
`

const OverlaySection = styled.div``


const OverlayTitle = ({ children, buttonRef, onClose, ...props }) => (
  <OverlayTitleWrap {...props}>
    <OverlayTitleContent>{children}</OverlayTitleContent>
    <IconButton onClick={onClose} ref={buttonRef} aria-label="close">X</IconButton>
  </OverlayTitleWrap>
)

export const story_Overlay = () => {
  const [open, setOpen] = React.useState(true)
  
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Show Overlay</Button>
      {open && (
        <Overlay onClose={() => setOpen(false)} aria-label="Example Overlay">
          {({ onClose, first, last, focusedOnMount }) => (
            <>
              <OverlayTitle onClose={onClose} buttonRef={first}>
                Example Overlay
              </OverlayTitle>
              <OverlaySection>
                <Button ref={focusedOnMount} onClick={onClose}>OK</Button>
                {' '}
                <Button ref={last} onClick={onClose} variant="secondary">Cancel</Button>
              </OverlaySection>
            </>
          )}
        </Overlay>
      )}
    </div>
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
