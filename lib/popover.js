import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink,
} from "@reach/menu-button"
import { Button } from './button'

export const PopoverMenu = ({ label, buttonProps = {}, options, onChange, ...props }) => {
  return (
    <Menu data-module="PopoverMenu" {...props}>
      <Button as={MenuButton} {...buttonProps}>
        {label}
      </Button>
      <MenuList>
        {options.map(option => option.href ? (
          <MenuLink key={option.id} href={option.href}>
            <Button decorative>{option.label}</Button>
          </MenuLink>
        ) : (
          <MenuItem key={option.id} onSelect={(e) => onChange(option.id, e)}>
            <Button decorative>{option.label}</Button>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
PopoverMenu.propTypes = {
  label: PropTypes.node.isRequired,
  buttonProps: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      label: PropTypes.node.isRequired,
      href: PropTypes.string,
    }).isRequired,
  ).isRequired,
  onChange: PropTypes.func,
}

export const story_PopoverMenu = () => (
  <PopoverMenu 
    label="Options"
    options={[
      {
        id: 'foo', label: 'Foo',
        id: 'bar', label: 'Bar',
      }
    ]}
    onChange={(id) => console.log(id)}
  />
)