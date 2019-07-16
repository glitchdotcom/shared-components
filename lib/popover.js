import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, DecorativeButton } from './button';
import { theme } from './system';
import { onArrowKeys } from './keyboard-navigation';

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


const debounce = (fn, timeout) => {
  let handle
  return (...args) => {
    if (handle) window.clearTimeout(handle)
    
    handle = window.setTimeout(() => , timeout)
  }
}


const usePositionAdjustment = ({ margin }) => {
  const [offset, setOffset] = React.useState({ top: 0, left: 0 });
  const ref = React.useRef();
  useLayoutEffect(() => {
    const setPosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect) {
          if (rect.left < margin) {
            setOffset((prevOffset) => ({ ...prevOffset, left: margin - rect.left }));
          } else if (rect.right > window.innerWidth - margin) {
            setOffset((prevOffset) => ({ ...prevOffset, left: window.innerWidth - margin - rect.right }));
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
  }, [margin]);
  return { ref, offset };
};

const PopoverContent = styled.div`
  border: 1px solid ${theme('colors.border')};
  position: absolute;
  width: ${({ size }) => size === 'wide' ? '350px' : 'auto'};
  z-index: 1;
  ${({ align }) => ({
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
  })[align]}
`;
PopoverContent.propTypes = {
  size: PropTypes.oneOf(['normal', 'wide']),
  align: PropTypes.oneOf(['left', 'right', 'topLeft', 'topRight']).isRequired,
}
PopoverContent.defaultProps = {
  size: 'normal',
}

const PopoverInfo = styled.div`
  color: ${theme('colors.primary')};
  background-color: ${theme('colors.secondaryBackground')};
  padding: 0.5em;
`;

const PopoverActions = styled.div`
  color: ${theme('colors.primary')};
  background-color: ${theme('colors.background')};
  padding: 0.5em;
`;

const PopoverDangerActions = styled.div`
  color: ${theme('colors.warning.text')};
  background-color: ${theme('colors.warning.background')};
  padding: 0.5em;
`;

const useClickOutside = (open, onClickOutside) => {
  const ref = React.useRef();
  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (!ref.current.contains(e.target)) {
        onClickOutside(e);
      }
    };
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, [open]);
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
      <DecorativeButton as={PopoverToggle} onKeyDown={onKeyDown} {...buttonProps} aria-haspopup="menu" aria-expanded={open}>
        {label}
      </DecorativeButton>
      {children({ open, onClose: () => setOpen(false) })}
    </PopoverContainer>
  );
};
PopoverMenu.propTypes = {
  label: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
  buttonProps: PropTypes.object,
};

const PopoverActionsUL = styled(PopoverActions)`
  margin: 0;
  list-style-type: none;
`;

const PopoverLI = styled.li`
  & + li {
    margin-top: 0.5em;
  }
`

const PopoverActionsList = ({ options, open, onClose, ...props }) => {
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

  // TODO: this should close if its a 'regular' action but stay open if it opens a sub-menu
  const closeAndChange = ({ onClick, id }, e) => {
    onClose(e);
    onClick(id, e);
  };

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

  return (
    <PopoverContent data-module="PopoverActionsList" {...props}>
      <PopoverActionsUL as="ul">
        {options.map((option, index) => (
          <PopoverLI key={option.id}>
            <Button
              size="small"
              variant="secondary"
              onClick={(e) => closeAndChange(option, e)}
              tabIndex={index === focusedIndex ? 0 : -1}
              ref={(el) => (refs.current[index] = el)}
              onKeyDown={onKeyDown}
            >
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

export const story_PopoverMenu = () => (
  <PopoverMenu label="Delete Team">
    {({ open, onClose }) => (
      <PopoverContent align="left" size="wide">
        <PopoverInfo>
          <p>
            Deleting this team will remove this team page. No projects will be deleted, but only current project members will be able to edit them.
          </p>
        </PopoverInfo>
        <PopoverDangerActions>
          <Button size="small" variant="secondary" onClick={() => console.log('boom')}>
            Delete Team
          </Button>
        </PopoverDangerActions>
      </PopoverContent>
    )}
  </PopoverMenu>
);

export const story_PopoverMenu_Actions_List = () => (
  <PopoverMenu label="Options">
    {({ open, onClose }) => (
      <PopoverActionsList
        align="left"
        open={open}
        onClose={onClose}
        options={[
          {
            id: 'foo',
            label: 'Add Project to Collection',
            onClick: () => { console.log('foo') },
          },
          {
            id: 'bar',
            label: 'Pin Project',
            onClick: () => { console.log('bar') },
          },
          {
            id: 'baz',
            label: 'Leave Project',
            onClick: () => { console.log('baz') },
          },
        ]}
      />
    )}
  </PopoverMenu>
);
