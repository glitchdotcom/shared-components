import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

const CheckboxInput = styled.input`
  margin: 0 var(--space-1) 0 0;
  padding: 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: baseline;
`;

export const Checkbox = React.forwardRef(({ children, onChange, value, ...props }, ref) => (
  <CheckboxLabel data-module="Checkbox" {...props}>
    <CheckboxInput type="checkbox" checked={value} onChange={(evt) => onChange(evt.target.checked, evt)} ref={ref} />
    {children}
  </CheckboxLabel>
));

Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export const StoryCheckbox = () => {
  const [value, onChange] = React.useState(false);
  return (
    <>
      <p>The Checkbox component renders a checkbox & label.</p>
      <CodeExample>
        {code`
          <Checkbox value={refreshOnChanges} onChange={(isChecked) => setRefreshAppOnChanges(isChecked)}>
            Refresh App on Changes
          </CheckboxButton>
        <`}
      </CodeExample>
      <PropsDefinition>
        <Prop name="value" required>
          Whether the button is checked. <code>true</code> or <code>false</code>.
        </Prop>
        <Prop name="onChange" required>
          A callback function, which is called with the input's new value on change events.
        </Prop>
      </PropsDefinition>

      <Checkbox value={value} onChange={(val) => onChange(val)}>
        Refresh App on Changes
      </Checkbox>
    </>
  );
};
