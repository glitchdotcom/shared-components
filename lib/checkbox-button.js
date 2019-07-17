import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DecorativeButton } from './button'

export const CheckboxButton = React.forwardRef(({ children, onChange, value, ...props }, ref) => {
  return (
    <DecorativeButton as="label" {...props}>
      <input type="checkbox" checked={value} onChange={(evt) => onChange(evt.target.checked, evt)} ref={ref} />
      {children}
    </DecorativeButton>
  );
});

CheckboxButton.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export const story_CheckboxButton = () => {
  const [value, onChange] = React.useState(false)
  return (
    <CheckboxButton size="small" value={value} onChange={(val) => onChange(val)}>
      Refresh App on Changes
    </CheckboxButton>
  )
}