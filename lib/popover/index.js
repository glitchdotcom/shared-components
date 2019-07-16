import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, DecorativeButton } from '../button';
import { theme } from '../system';
import { onArrowKeys } from '../keyboard-navigation';

import { PopoverContent } from './content';
import { PopoverMenu } from './menu';

const PopoverInfo = styled.div`
  color: ${theme('colors.primary')};
  background-color: ${theme('colors.secondaryBackground')};
  padding: ${theme('space.1')};
`;

const PopoverActions = styled.div`
  color: ${theme('colors.primary')};
  background-color: ${theme('colors.background')};
  padding: ${theme('space.1')};
`;

const PopoverDangerActions = styled.div`
  color: ${theme('colors.warning.text')};
  background-color: ${theme('colors.warning.background')};
  padding: ${theme('space.1')};
`;


const PopoverActionsUL = styled(PopoverActions)`
  margin: 0;
  list-style-type: none;
`;

const PopoverLI = styled.li`
  & + li {
    margin-top: ${theme('space.1')};
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
