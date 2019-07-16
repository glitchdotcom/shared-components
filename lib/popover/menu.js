import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DecorativeButton } from '../button';

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
      <DecorativeButton as={PopoverToggle} onKeyDown={onKeyDown} aria-haspopup="menu" aria-expanded={open} {...buttonProps}>
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