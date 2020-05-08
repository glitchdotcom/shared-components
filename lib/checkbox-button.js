import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './button';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

const Checkbox = styled.input`
  margin: 0 var(--space-1) 0 0;
  padding: 0;
  vertical-align: top;
`;

export const CheckboxButton = React.forwardRef(({ children, onChange, value, ...props }, ref) => (
  <Button data-module="CheckboxButton" as="label" {...props}>
    <Checkbox type="checkbox" checked={value} onChange={(evt) => onChange(evt.target.checked, evt)} ref={ref} />
    {children}
  </Button>
));

CheckboxButton.displayName = 'CheckboxButton';

CheckboxButton.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export const StoryCheckboxButton = () => {
  const [value, onChange] = React.useState(false);
  return (
    <>
      <p>The CheckboxButton component renders a checkbox & label styled as a button.</p>
      <CodeExample>
        {code`
          <CheckboxButton size="small" variant="secondary" value={refreshOnChanges} onChange={(isChecked) => setRefreshAppOnChanges(isChecked)}>
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
      <p>All other props (e.g. 'variant', 'size') are passed to the button container.</p>
      <CheckboxButton size="small" variant="secondary" value={value} onChange={(val) => onChange(val)}>
        Refresh App on Changes
      </CheckboxButton>
    </>
  );
};
