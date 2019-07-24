import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './button';

const Checkbox = styled.input`
  margin: 0 var(--space-1) 0 0;
  padding: 0;
  vertical-align: top;
`;

export const CheckboxButton = React.forwardRef(({ children, onChange, value, ...props }, ref) => {
  return (
    <Button data-module="CheckboxButton" as="label" {...props}>
      <Checkbox type="checkbox" checked={value} onChange={(evt) => onChange(evt.target.checked, evt)} ref={ref} />
      {children}
    </Button>
  );
});

CheckboxButton.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export const StoryCheckboxButton = () => {
  const [value, onChange] = React.useState(false);
  return (
    <CheckboxButton size="small" variant="secondary" value={value} onChange={(val) => onChange(val)}>
      Refresh App on Changes
    </CheckboxButton>
  );
};
