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
  text-align: left;

  border: 1px solid var(--colors-border);
  box-shadow: var(--popShadow);
  z-index: 10;
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

const PopoverContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const useClickOutside = (open, onClickOutside) => {
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

export const Popover = ({ align, renderLabel, views = {}, initialView, startOpen, children, contentProps, ...props }) => {
  const [open, setOpen] = React.useState(startOpen);
  const focusedOnMount = React.useRef();
  const toggleRef = React.useRef();
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
  React.useEffect(() => {
    if (open && focusedOnMount.current) focusedOnMount.current.focus();
  }, [open, activeView]);

  const rootRef = useClickOutside(open, onClose);

  const onToggle = (e) => {
    if (open) {
      onClose();
    } else {
      onOpen();
    }
  };
  // if a user has tabbed inside a popover and presses escape they should return back to the popover button
  const returnFocusOnClose = () => {
    onClose()
    toggleRef.current.focus();
  }

  useEscape(open, returnFocusOnClose);

  // see https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton
  return (
    <PopoverContainer data-module="Popover" startOpen ref={rootRef} {...props}>
      {renderLabel({ onClick: onToggle, ref: toggleRef })}
      {open && (
        <PopoverContent align={align} {...contentProps}>
          {activeViewFunc({ setActiveView, onClose, onBack, focusedOnMount })}
        </PopoverContent>
      )}
    </PopoverContainer>
  );
};
Popover.propTypes = {
  align: PropTypes.oneOf(Object.keys(alignments)).isRequired,
  renderLabel: PropTypes.func.isRequired,
  views: PropTypes.objectOf(PropTypes.func.isRequired),
  initialView: PropTypes.string,
  children: PropTypes.func.isRequired,
  contentProps: PropTypes.object,
  startOpen: PropTypes.bool,
};

const WidePopover = styled.div`
  width: 22rem;
`;

export const StoryPopover = () => (
  <>
    <p>The Popover component renders accessible and nestable popovers.</p>
    <CodeExample>
      {code`
        <Popover
          align="right"
          renderLabel={({ onClick, ref }) => <MenuButton onClick={onClick} ref={ref} />}
        >
          {({ onClose }) => (
            <MenuOptions onClose={onClose} />
          )}
        </Popover>
      `}
    </CodeExample>
    <PropsDefinition>
      <Prop name="align" required>
        The edge of the label that the button aligns with. Options are "left", "right", "topLeft", "topRight".
      </Prop>
      <Prop name="renderLabel" required>
        A render prop, which passing in an object with the following properties:
        <dl>
          <dt>onClick</dt>
          <dd>A callback function to toggle the popover.</dd>
          <dt>ref</dt>
          <dd>A ref for the toggle button, so that it is focused when the popover closes.</dd>
        </dl>
      </Prop>
      <Prop name="views">An object mapping the names of secondary popover pages to functions that render them.</Prop>
      <Prop name="initialView">If provided, the popover will open in this view instead of the one in the "children" prop.</Prop>
      <Prop name="children" required>
        A render prop, which passes in an object with the following properties:
        <dl>
          <dt>setActiveView</dt>
          <dd>A callback function to set the active view of the popover.</dd>
          <dt>onClose</dt>
          <dd>A callback function called to close the popover.</dd>
          <dt>onBack</dt>
          <dd>A callback function called to render the previous view.</dd>
          <dt>focusedOnMount</dt>
          <dd>A ref to the focusable element that will be focused when the overlay is opened.</dd>
        </dl>
        <p>These properties are also passed to the functions in the "views" object.</p>
      </Prop>
      <Prop name="toggleProps">Additional props passed to the popover toggle button.</Prop>
      <Prop name="contentProps">Additional props passed to the popover content wrapper.</Prop>
    </PropsDefinition>
    <Popover align="left" startOpen renderLabel={(labelProps) => <Button {...labelProps}>Delete Team</Button>}>
      {({ onClose, focusedOnMount }) => (
        <WidePopover>
          <Title onCloseRef={focusedOnMount} onClose={onClose}>
            Delete @glitch
          </Title>
          <Info>
            <p>
              Deleting this team will remove this team page. No projects will be deleted, but only current project members will be able to edit them.
            </p>
          </Info>
          <DangerZone>
            <Button size="small" variant="warning" onClick={() => console.log('boom')}>
              Delete Team
            </Button>
          </DangerZone>
        </WidePopover>
      )}
    </Popover>
  </>
);

const ActionsStack = styled(Actions)`
  > * + * {
    margin-top: var(--space-1);
    display: block;
  }
`;

export const StoryPopover_with_Multiple_Views = () => (
  <>
    <p>Popover components can render multi-page popovers using the "views" prop.</p>
    <CodeExample>
      {code`
        <Popover
          renderLabel={(labelProps) => <MenuButton {...labelProps} />} 
          align="right"
          views={{
            switchProject: ({ onClose, onBack }) => (
              <SwitchProject onClose={onClose} onBack={onBack} />
            ),
          }}>
          {({ onClose, setActiveView }) => (
            <MenuOptions onClose={onClose} setActiveView={setActiveView} />
          )}
        </Popover>
      `}
    </CodeExample>
    <Popover
      align="left"
      renderLabel={(labelProps) => <Button {...labelProps}>Open Multi-Page Popover</Button>}
      views={{
        foo: ({ onClose, onBack, focusedOnMount }) => (
          <WidePopover>
            <Title onBack={onBack} onBackRef={focusedOnMount} onClose={onClose}>
              Foo
            </Title>
            <Info>Foo content goes here</Info>
          </WidePopover>
        ),
        bar: ({ setActiveView, onClose, onBack, focusedOnMount }) => (
          <WidePopover>
            <Title onBack={onBack} onClose={onClose}>
              Bar
            </Title>
            <Info>Bar content goes here</Info>
            <Actions>
              <Button ref={focusedOnMount} onClick={() => setActiveView('foo')}>
                Show Foo
              </Button>
            </Actions>
          </WidePopover>
        ),
      }}
    >
      {({ setActiveView, onClose, focusedOnMount }) => (
        <WidePopover>
          <Title onClose={onClose}>Multi-Page Popover</Title>
          <ActionsStack>
            <Button ref={focusedOnMount} onClick={() => setActiveView('foo')}>
              Show Foo
            </Button>
            <Button onClick={() => setActiveView('bar')}>Show Bar</Button>
          </ActionsStack>
        </WidePopover>
      )}
    </Popover>
  </>
);
