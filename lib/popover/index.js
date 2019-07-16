import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, DecorativeButton } from '../button';
import { onArrowKeys } from '../keyboard-navigation';
import { Info, Actions, DangerZone } from '../block'

import { PopoverContent } from './content';
import { PopoverMenu } from './menu';
import { PopoverActionsList } from './actions-list'

export { PopoverContent } from './content';
export { PopoverMenu } from './menu';
export { PopoverActionsList } from './actions-list'

export const story_PopoverMenu = () => (
  <PopoverMenu label="Delete Team">
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
            onClick: () => {
              console.log('foo');
            },
          },
          {
            id: 'bar',
            label: 'Pin Project',
            onClick: () => {
              console.log('bar');
            },
          },
          {
            id: 'baz',
            label: 'Leave Project',
            onClick: () => {
              console.log('baz');
            },
          },
        ]}
      />
    )}
  </PopoverMenu>
);