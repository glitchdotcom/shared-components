import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Button } from './button';
import { IconButton } from './icon-button';
import { onArrowKeys } from './keyboard-navigation';
import { Title, Info, Actions, DangerZone } from './block';
import { useCallbackProxy } from './callback-proxy';
import { Icon } from './icon';

const debounce = (fn, timeout) => {
  let handle;
  return (...args) => {
    if (handle) window.clearTimeout(handle);
    handle = window.setTimeout(() => fn(...args), timeout);
  };
};

const usePositionAdjustment = () => {
  const [offset, setOffset] = React.useState({ top: 0, left: 0 });
  const ref = React.useRef();
  React.useLayoutEffect(() => {
    const setPosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect) {
          if (rect.left < 0) {
            setOffset((prevOffset) => ({ ...prevOffset, left: -rect.left }));
          } else if (rect.right > window.innerWidth) {
            setOffset((prevOffset) => ({ ...prevOffset, left: window.innerWidth - rect.right }));
          } else {
            setOffset((prevOffset) => ({ ...prevOffset, left: 0 }));
          }
        }
      }
    };
    const debounced = debounce(setPosition, 300);
    window.addEventListener('resize', debounced);
    setPosition();
    return () => window.removeEventListener('resize', debounced);
  }, []);
  return { ref, offset };
};

const PopoverWrap = styled.div`
  position: absolute;
  ${({ size }) => sizes[size]}
  ${({ align }) => alignments[align]}
`;

const sizes = {
  normal: css`
    width: auto;
  `,
  wide: css`
    width: 22rem;
  `,
};
const alignments = {
  left: css`
    left: 0;
  `,
  right: css`
    right: 0;
  `,
  topLeft: css`
    left: 0;
    bottom: 100%;
  `,
  topRight: css`
    right: 0;
    bottom: 100%;
  `,
};

const PopoverInner = styled.div`
  position: relative;
  overflow: hidden;
  background-color: var(--colors-background);
  font-size: var(--fontSizes-small);
  border-radius: var(--rounded);

  border: 1px solid var(--colors-border);
  box-shadow: var(--pop-shadow);
  z-index: 1;
`;

export const Popover = ({ size, align, children, theme, ...props }) => {
  const { ref, offset } = usePositionAdjustment();
  return (
    <PopoverWrap data-module="Popover" size={size} align={align} {...props}>
      <PopoverInner ref={ref} style={offset}>
        {children}
      </PopoverInner>
    </PopoverWrap>
  );
};

Popover.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
  align: PropTypes.oneOf(Object.keys(alignments)).isRequired,
  children: PropTypes.node.isRequired,
};
Popover.defaultProps = {
  size: 'normal',
};

const PopoverContainer = styled.details`
  position: relative;
  display: inline-block;
`;
const PopoverToggle = styled.summary`
  list-style-image: none;
  &::-webkit-details-marker {
    display: none;
    background: none;
    color: transparent;
    width: 0;
  }
`;

export const useClickOutside = (open, onClickOutside) => {
  const ref = React.useRef();
  const onClickOutsideProxy = useCallbackProxy(onClickOutside);
  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (document.body.contains(e.target) && !ref.current.contains(e.target)) {
        onClickOutsideProxy(e);
      }
    };
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, [open, onClickOutsideProxy]);
  return ref;
};

const useStack = (defaultState) => {
  const [stack, setStack] = React.useState([defaultState]);
  const top = stack[stack.length - 1];
  const push = (value) => setStack((prev) => prev.concat([value]));
  const pop = () => setStack((prev) => prev.slice(0, -1));
  const clear = () => setStack([defaultState]);
  return { top, push, pop, clear };
};

export const PopoverMenu = ({ label, buttonProps = {}, views = {}, initialView, children, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const { top: activeView, push: setActiveView, pop: onBack, clear } = useStack(initialView);
  const activeViewFunc = views[activeView] || children;
  const onOpen = () => {
    setOpen(true);
    clear();
  };
  const onClose = () => {
    setOpen(false);
    clear();
  };

  const rootRef = useClickOutside(open, onClose);

  const onToggle = (e) => {
    // NOTE: this runs _after_ it toggles; we're updating the React state so that it matches the internal state
    if (e.target.open) {
      onOpen();
    } else {
      onClose();
    }
  };
  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  // see https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton
  return (
    <PopoverContainer data-module="PopoverMenu" ref={rootRef} onToggle={onToggle} open={open} role="menu" {...props}>
      <PopoverToggle onKeyDown={onKeyDown} aria-haspopup="menu" aria-expanded={open}>
        {label}
      </PopoverToggle>
      {activeViewFunc({ open, activeView, setActiveView, onClose, onBack })}
    </PopoverContainer>
  );
};
PopoverMenu.propTypes = {
  label: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
  buttonProps: PropTypes.object,
};

export const StoryPopoverMenu = () => (
  <PopoverMenu label={<Button as="span">Delete Team</Button>}>
    {({ onClose }) => (
      <Popover align="left" size="wide">
        <Info>
          <p>
            Deleting this team will remove this team page. No projects will be deleted, but only current project members will be able to edit them.
          </p>
        </Info>
        <DangerZone>
          <Button size="small" variant="secondary" onClick={() => console.log('boom')}>
            Delete Team
          </Button>
        </DangerZone>
      </Popover>
    )}
  </PopoverMenu>
);

export const StoryPopoverMenu_Multiple_Views = () => (
  <PopoverMenu
    label={<Button as="span">Open Multi-Page Popover</Button>}
    views={{
      foo: ({ onClose, onBack }) => (
        <Popover align="left" size="wide">
          <Title onBack={onBack} onClose={onClose}>
            Foo
          </Title>
          <Info>Foo content goes here</Info>
        </Popover>
      ),
      bar: ({ setActiveView, onClose, onBack }) => (
        <Popover align="left" size="wide">
          <Title onBack={onBack} onClose={onClose}>
            Bar
          </Title>
          <Info>Bar content goes here</Info>
          <Actions>
            <Button onClick={() => setActiveView('foo')}>Show Foo</Button>
          </Actions>
        </Popover>
      ),
    }}
  >
    {({ setActiveView, onClose }) => (
      <Popover align="left" size="wide">
        <Title onClose={onClose}>Multi-Page Popover</Title>
        <Actions>
          <Box mb={1}>
            <Button onClick={() => setActiveView('foo')}>Show Foo</Button>
          </Box>
          <Box>
            <Button onClick={() => setActiveView('bar')}>Show Bar</Button>
          </Box>
        </Actions>
      </Popover>
    )}
  </PopoverMenu>
);
