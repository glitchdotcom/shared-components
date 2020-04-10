/* eslint-disable no-unused-vars */
// TODO remove me before merge

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

export const Tooltip = ({props}) => <p>hi</p>;

export const StoryTooltip = () => {
  // const [value, onChange] = React.useState(false);
  return (
    <>
      <p>The Tooltip component ...</p>
      <CodeExample>{code`<Tooltip />`}</CodeExample>
      <PropsDefinition>
        {/* <Prop name="value" required>
          Whether the button is checked. <code>true</code> or <code>false</code>.
        </Prop>
        <Prop name="onChange" required>
          A callback function, which is called with the input's new value on change events.
        </Prop>
        <Prop name="label" required>
          A label that describes the value that is being toggle
  </Prop> */}
      </PropsDefinition>

      {/* <ToggleHeader>
        <h3>Notifications settings</h3> <Toggle value={value} onChange={onChange} label="Enable notifications" />
      </ToggleHeader> */}
    </>
  );
};
