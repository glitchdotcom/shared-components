import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, UnstyledButton } from './button';
import { IconButton } from './icon-button';
import { Title, Info, Actions } from './block';
import { Icon } from './icon';
import { useCallbackProxy, withProps } from './util';

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
  background-color: rgba(255, 255, 255, 0.5);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const OverlayContent = withProps(
  styled.dialog`
    position: relative;
    width: 100%;
    max-width: 640px;
    margin: 0;
    padding: 0;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background-color: var(--colors-background);
    color: var(--colors-primary);
    font-size: var(--fontSizes-small);
    border: 2px var(--colors-primary) solid;
    border-radius: var(--rounded);
    box-shadow: var(--pop-shadow);
    overflow: auto;
  `,
  {
    'data-module': 'OverlayContent',
    open: true,
    'aria-modal': true,
  },
);

const FixedBodyStyle = styled.createGlobalStyle`
  body {
    position: fixed;
    top: -${({ scrollY }) => scrollY}px;
  }
`;

const FixedBody = () => {
  const [scrollY, setScrollY] = React.useState(null)
  React.useEffect(() => {
    const prevScrollPosition = window.scrollY
    setScrollY(prevScrollPosition)
    return () => {
      window.scrollY = prevScrollPosition
    }
  }, [])
  return scrollY === null ? null : <FixedBodyStyle scrollY={scrollY} />
}


const useFocusTrap = () => {
  const first = React.useRef();
  const last = React.useRef();
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Tab' && !e.shiftKey && e.target === last.current) {
        e.preventDefault();
        first.current.focus();
      }
      if (e.key === 'Tab' && e.shiftKey && e.target === first.current) {
        e.preventDefault();
        last.current.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return { first, last };
};

const useFocusOnMount = () => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current.focus();
  }, []);
  return ref;
};

const useEscape = (onClose) => {
  const memoOnClose = useCallbackProxy(onClose);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        memoOnClose(e);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [memoOnClose]);
};

// https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
export const Overlay = ({ onClose, children, ...props }) => {
  useEscape(onClose);
  const { first, last } = useFocusTrap();
  const focusedOnMount = useFocusOnMount();

  const onClickBackground = (e) => {
    if (e.currentTarget === e.target) {
      onClose(e);
    }
  };

  return (
    <OverlayWrap data-module="Overlay" onClick={onClickBackground} {...props}>
      <FixedBody />
      {children({ onClose, first, last, focusedOnMount })}
    </OverlayWrap>
  );
};
Overlay.propTypes = {
  children: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export const StoryOverlay = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Show Overlay</Button>
      {open && (
        <Overlay onClose={() => setOpen(false)}>
          {({ onClose, first, last, focusedOnMount }) => (
            <OverlayContent aria-label="Example Overlay">
              <Title onClose={onClose} onCloseRef={first}>
                Example Overlay
              </Title>
              <Info>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet faucibus augue quis laoreet. Ut cursus venenatis nisl, ut
                  ullamcorper lectus. Nunc nec lacus sem. Donec nulla arcu, dignissim id feugiat id, varius nec leo. Donec sit amet ultrices magna.
                  Proin quis metus quis metus vulputate posuere et eget quam. Ut nunc ante, convallis ac ornare nec, porttitor id lectus. Suspendisse
                  orci urna, placerat a pulvinar at, porta quis ante. Suspendisse eleifend mauris in tincidunt hendrerit. Praesent sagittis dui eu
                  metus consectetur, in sagittis dui euismod. Aenean massa libero, pellentesque eu metus ut, varius ultricies orci. Vestibulum sit
                  amet magna aliquam, semper tortor vitae, vehicula eros. Aliquam quis elementum dui. Integer in nisl quis est aliquet commodo vitae
                  in eros. Integer et metus dapibus sem viverra pretium. Quisque et elit nisl.
                </p>
              </Info>
              <Actions>
                <Button ref={focusedOnMount} onClick={onClose}>
                  OK
                </Button>{' '}
                <Button ref={last} onClick={onClose} variant="secondary">
                  Cancel
                </Button>
              </Actions>
            </OverlayContent>
          )}
        </Overlay>
      )}
    </div>
  );
};
