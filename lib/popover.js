import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Button } from './button';
import { Title, Info, Actions, DangerZone } from './block';
import { useCallbackProxy } from './callback-proxy';
import { useEscape } from './keyboard-navigation';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

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
  width: auto;
  ${({ align }) => alignments[align]}
`;

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
  box-shadow: var(--popShadow);
  z-index: 1;
`;

const PopoverContent = ({ align, children, ...props }) => {
  const { ref, offset } = usePositionAdjustment();
  return (
    <PopoverWrap data-module="Popover" align={align} {...props}>
      <PopoverInner ref={ref} style={offset}>
        {children}
      </PopoverInner>
    </PopoverWrap>
  );
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

export const Popover = ({ open, onChange, align, label, views = {}, initialView, children, contentProps, ...props }) => {
  const focusOnOpenRef = React.useRef();
  const { top: activeView, push: setActiveView, pop: onBack, clear } = useStack(initialView);
  const activeViewFunc = views[activeView] || children;
  const onOpen = () => {
    onChange(true);
    if (focusOnOpenRef.current) focusOnOpenRef.current.focus();
    clear();
  };
  const onClose = () => {
    onChange(false);
    clear();
  };
  React.useEffect(() => {
    if (focusOnOpenRef.current) focusOnOpenRef.current.focus();
  }, [activeView]);

  const rootRef = useClickOutside(open, onClose);

  const onToggle = (e) => {
    // NOTE: this runs _after_ it toggles; we're updating the React state so that it matches the internal state
    if (e.target.open) {
      onOpen();
    } else {
      onClose();
    }
  };

  useEscape(onClose);

  // see https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton
  return (
    <PopoverContainer data-module="PopoverMenu" ref={rootRef} onToggle={onToggle} open={open} role="menu" {...props}>
      <PopoverToggle aria-haspopup="menu" aria-expanded={open}>
        {label}
      </PopoverToggle>
      <PopoverContent align={align} {...contentProps}>
        {activeViewFunc({ open, activeView, setActiveView, onClose, onBack, focusOnOpenRef })}
      </PopoverContent>
    </PopoverContainer>
  );
};
Popover.propTypes = {
  open: PropTypes.bool.isRequired,
  align: PropTypes.oneOf(Object.keys(alignments)).isRequired,
  label: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
  contentProps: PropTypes.func.isRequired,
};

const WidePopover = styled.div`
  width: 22rem;
`

export const StoryPopover = () => (
  <>
    <p>The Popover component renders accessible and nestable popovers.</p>
    <CodeExample>
      {code`
        <PopoverMenu label={<MenuButton />} align="right">
          {({ onClose }) => (
            <MenuOptions onClose={onClose} />
          )}
        </PopoverMenu>
      `}
    </CodeExample>
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
  </>
);

const ActionsStack = styled(Actions)`
  > * + * {
    margin-top: var(--space-1);
    display: block;
  }
`;

export const StoryPopoverMenu_Multiple_Views = () => (
  <PopoverMenu
    label={<Button as="span">Open Multi-Page Popover</Button>}
    views={{
      foo: ({ onClose, onBack, focusOnOpenRef }) => (
        <Popover align="left" size="wide">
          <Title onBack={onBack} onBackRef={focusOnOpenRef} onClose={onClose}>
            Foo
          </Title>
          <Info>Foo content goes here</Info>
        </Popover>
      ),
      bar: ({ setActiveView, onClose, onBack, focusOnOpenRef }) => (
        <Popover align="left" size="wide">
          <Title onBack={onBack} onClose={onClose}>
            Bar
          </Title>
          <Info>Bar content goes here</Info>
          <Actions>
            <Button ref={focusOnOpenRef} onClick={() => setActiveView('foo')}>
              Show Foo
            </Button>
          </Actions>
        </Popover>
      ),
    }}
  >
    {({ setActiveView, onClose, focusOnOpenRef }) => (
      <Popover align="left" size="wide">
        <Title onClose={onClose}>Multi-Page Popover</Title>
        <ActionsStack>
          <Button ref={focusOnOpenRef} onClick={() => setActiveView('foo')}>
            Show Foo
          </Button>
          <Button onClick={() => setActiveView('bar')}>Show Bar</Button>
        </ActionsStack>
      </Popover>
    )}
  </PopoverMenu>
);
