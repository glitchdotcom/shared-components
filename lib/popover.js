import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@reach/menu-button"
import { Button } from './button'

export const PopoverMenu = ({ label, buttonProps, children, ...props }) => {

  return (
    <Menu data-module="PopoverMenu" {...props}>
      <Button as={MenuButton} {...buttonProps}>
        {label}
      </Button>
      <MenuList>
        
      </MenuList>
    </Menu>
  )
}