import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './button';
import { Title, Info, Actions } from './block';
import { useEscape, useFocusTrap } from './keyboard-navigation';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

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
  z-index: var(--z-overlay);
  background-color: rgba(255, 255, 255, 0.5);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const OverlayContent = styled.dialog.attrs(() => ({
  'data-module': 'OverlayContent',
  open: true,
  'aria-modal': true,
}))`
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
  box-shadow: var(--popShadow);
  overflow: auto;
`;

const FixedBodyStyle = styled.createGlobalStyle`
  body {
    position: fixed;
    width: 100%;
    top: -${({ scrollY }) => scrollY}px;
  }
`;

// Toggling between fixed and static position on the body resets the scroll position,
// so we need to store the original position, offset the body when the overlay is open, and reset it when its closed.
const FixedBody = () => {
  const [scrollY, setScrollY] = React.useState(null);
  React.useEffect(() => {
    const prevScrollPosition = window.scrollY;
    setScrollY(prevScrollPosition);
    return () => {
      window.setTimeout(() => window.scrollTo(0, prevScrollPosition), 0);
    };
  }, []);
  return scrollY === null ? null : <FixedBodyStyle scrollY={scrollY} />;
};

const useFocusOnMount = (open) => {
  const ref = React.useRef();
  React.useEffect(() => {
    if (open) ref.current.focus();
  }, [open]);
  return ref;
};

export const mergeRefs = (...refs) => (el) => {
  for (const ref of refs) {
    ref.current = el;
  }
};

// https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
export const Overlay = ({ open, onClose, children, label, contentProps, ...props }) => {
  useEscape(onClose);
  const { first, last } = useFocusTrap();
  const focusedOnMount = useFocusOnMount(open);

  const onClickBackground = (e) => {
    if (e.currentTarget === e.target) {
      onClose(e);
    }
  };

  if (!open) return null;

  return (
    <OverlayWrap data-module="Overlay" onClick={onClickBackground} {...props}>
      <FixedBody />
      <OverlayContent {...contentProps}>{children({ onClose, first, last, focusedOnMount })}</OverlayContent>
    </OverlayWrap>
  );
};
Overlay.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  contentProps: PropTypes.object,
};

export const useOverlay = () => {
  const [open, setOpen] = React.useState(false);
  const toggleRef = React.useRef();
  const onOpen = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    console.log('about to focus');
    toggleRef.current.focus();
  };
  return { open, onOpen, onClose, toggleRef };
};

export const StoryOverlay = () => {
  const { open, onOpen, onClose, toggleRef } = useOverlay();

  return (
    <>
      <p>The Overlay component renders an accessible modal.</p>
      <CodeExample>
        {code`
          <Overlay open={open} onClose={onClose}>
            {({ onClose, first, last, focusedOnMount }) => (
              <>
                <Title onClose={onClose} onCloseRef={first}>
                <Actions>
                  <Button ref={mergeRefs(last, focusedOnMount)} onClick={submitAndClose}>OK</Button>
                </Actions>
              </>
            )}
          </Overlay>
        `}
      </CodeExample>
      <PropsDefinition>
        <Prop name="open" required>
          Whether the overlay is visible. <code>true</code> or <code>false</code>.
        </Prop>
        <Prop name="onClose" required>
          A callback function called to close the overlay.
        </Prop>
        <Prop name="children" required>
          A render prop, which passes in an object with the following properties:
          <dl>
            <dt>onClose</dt>
            <dd>The same "onClose" as above.</dd>
            <dt>first</dt>
            <dd>
              A ref to the <em>first</em> focusable element in the overlay (for trapping focus).
            </dd>
            <dt>last</dt>
            <dd>
              A ref to the <em>last</em> focusable element in the overlay (for trapping focus).
            </dd>
            <dt>focusedOnMount</dt>
            <dd>A ref to the focusable element that will be focused when the overlay is opened.</dd>
          </dl>
          <p>
            If some of these refs refer to the same object, you can combine them with the <code>mergeRefs</code> function.
          </p>
        </Prop>
      </PropsDefinition>
      <Button onClick={onOpen} ref={toggleRef}>
        Show Overlay
      </Button>
      <Overlay open={open} onClose={onClose}>
        {({ onClose, first, last, focusedOnMount }) => (
          <>
            <Title onClose={onClose} onCloseRef={first}>
              Example Overlay
            </Title>
            <Info>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet faucibus augue quis laoreet. Ut cursus venenatis nisl, ut
                ullamcorper lectus. Nunc nec lacus sem. Donec nulla arcu, dignissim id feugiat id, varius nec leo. Donec sit amet ultrices magna.
                Proin quis metus quis metus vulputate posuere et eget quam. Ut nunc ante, convallis ac ornare nec, porttitor id lectus. Suspendisse
                orci urna, placerat a pulvinar at, porta quis ante. Suspendisse eleifend mauris in tincidunt hendrerit. Praesent sagittis dui eu metus
                consectetur, in sagittis dui euismod. Aenean massa libero, pellentesque eu metus ut, varius ultricies orci. Vestibulum sit amet magna
                aliquam, semper tortor vitae, vehicula eros. Aliquam quis elementum dui. Integer in nisl quis est aliquet commodo vitae in eros.
                Integer et metus dapibus sem viverra pretium. Quisque et elit nisl.
              </p>
            </Info>
            <Actions>
              <Button ref={focusedOnMount} onClick={onClose}>
                Primary Action
              </Button>
              &nbsp;
              <Button ref={last} onClick={onClose} variant="secondary">
                Secondary Action
              </Button>
            </Actions>
          </>
        )}
      </Overlay>
    </>
  );
};
