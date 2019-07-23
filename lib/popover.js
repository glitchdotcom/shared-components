import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton, Button } from './button';
import { onArrowKeys } from './keyboard-navigation';
import { Info, Actions, DangerZone } from './block';
import { useCallbackProxy } from './util';
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
  normal: styled.css`
    width: auto;
  `,
  wide: styled.css`
    width: 22rem;
  `,
};
const alignments = {
  left: styled.css`
    left: 0;
  `,
  right: styled.css`
    right: 0;
  `,
  topLeft: styled.css`
    left: 0;
    bottom: 100%;
  `,
  topRight: styled.css`
    right: 0;
    bottom: 100%;
  `,
};

const PopoverInner = styled.div`
  position: relative;
  overflow: hidden;
  // TODO: should these be defined on here or on the sections?
  background-color: var(--colors-background);
  font-size: var(--fontSizes-small);
  border-radius: var(--rounded);

  border: 1px solid var(--colors-border);
  box-shadow: var(--pop-shadow);
  z-index: 1;
`;

export const PopoverContent = ({ size, align, children, theme, ...props }) => {
  const { ref, offset } = usePositionAdjustment();
  return (
    <PopoverWrap data-module="PopoverContent" size={size} align={align} {...props}>
      <PopoverInner ref={ref} style={offset}>
        {children}
      </PopoverInner>
    </PopoverWrap>
  );
};

PopoverContent.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
  align: PropTypes.oneOf(Object.keys(alignments)).isRequired,
  children: PropTypes.node.isRequired,
};
PopoverContent.defaultProps = {
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
      if (!ref.current.contains(e.target)) {
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

export const PopoverMenu = ({ label, buttonProps = {}, children, ...props }) => {
  const [open, setOpen] = React.useState(false);

  const rootRef = useClickOutside(open, () => {
    setOpen(false);
  });

  const onToggle = (e) => {
    // NOTE: this runs _after_ it toggles; we're updating the React state so that it matches the internal state
    setOpen(e.target.open);
  };
  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
  };

  // see https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton
  return (
    <PopoverContainer data-module="PopoverMenu" ref={rootRef} onToggle={onToggle} open={open} role="menu" {...props}>
      <PopoverToggle onKeyDown={onKeyDown} aria-haspopup="menu" aria-expanded={open}>
        {label}
      </PopoverToggle>
      {children({ open, onClose: () => setOpen(false) })}
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
    {({ open, onClose }) => (
      <PopoverContent align="left" size="wide">
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
      </PopoverContent>
    )}
  </PopoverMenu>
);

const PopoverActionsUL = styled(Actions)`
  margin: 0;
  list-style-type: none;
`;

const PopoverLI = styled.li`
  & + & {
    margin-top: var(--space-1);
  }
`;

const useMenuOptions = ({ open, options, onClose }) => {
  const refs = React.useRef([]);
  const [focusedIndex, setFocusedIndex] = React.useState(open ? 0 : -1);
  React.useEffect(() => {
    setFocusedIndex(open ? 0 : -1);
  }, [open]);

  React.useEffect(() => {
    if (focusedIndex !== -1) {
      refs.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const setRefForIndex = (index) => (el) => (refs.current[index] = el);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose(e);
      return;
    }
    const nextIndex = onArrowKeys(e, focusedIndex, options);
    if (nextIndex !== null) {
      setFocusedIndex(nextIndex);
    }
  };

  return options.map((opt, index) => ({
    ...opt,
    menuProps: {
      tabIndex: index === focusedIndex ? 0 : -1,
      ref: setRefForIndex(index),
      onKeyDown,
    },
  }));
};

export const PopoverActionsList = ({ options, open, onClose, ...props }) => {
  const optionsWithMenuProps = useMenuOptions({ open, options, onClose });

  // TODO: this should close if its a 'regular' action but stay open if it opens a sub-menu
  const closeAndChange = ({ onClick, id }, e) => {
    onClose(e);
    onClick(id, e);
  };

  return (
    <PopoverContent data-module="PopoverActionsList" {...props}>
      <PopoverActionsUL as="ul">
        {optionsWithMenuProps.map((option) => (
          <PopoverLI key={option.id}>
            <Button size="small" variant="secondary" onClick={(e) => closeAndChange(option, e)} {...option.menuProps}>
              {option.label}
            </Button>
          </PopoverLI>
        ))}
      </PopoverActionsUL>
    </PopoverContent>
  );
};

PopoverActionsList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func.isRequired,
    }).isRequired,
  ).isRequired,
};

export const StoryPopoverMenu_Actions_List = () => (
  <PopoverMenu label={<IconButton icon="chevronDown" label="Options" as="span" />}>
    {({ open, onClose }) => (
      <PopoverActionsList
        align="left"
        open={open}
        onClose={onClose}
        options={[
          {
            id: 'foo',
            label: (
              <>
                Add Project to Collection <Icon icon="framedPicture" />
              </>
            ),
            onClick: () => {
              console.log('add project');
            },
          },
          {
            id: 'bar',
            label: (
              <>
                Pin Project <Icon icon="pushpin" />
              </>
            ),
            onClick: () => {
              console.log('pin project');
            },
          },
          {
            id: 'baz',
            label: (
              <>
                Leave Project <Icon icon="wave" />
              </>
            ),
            onClick: () => {
              console.log('leave project');
            },
          },
        ]}
      />
    )}
  </PopoverMenu>
);
