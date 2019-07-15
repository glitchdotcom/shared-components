import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const PopoverMenu = ({ label, buttonProps, ...props }) => {
  const [open, setOpen] = React.useState(false)
  
  return (
    <details data-module="PopoverMenu" open={open} {...props}>
      <Button as="summary" {...buttonProps}>
        {label}
      </Button>
    </details>
  )
}