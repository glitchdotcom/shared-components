import React from 'react'
import styled from 'styled-components'
import { BaseButton } from './button'
import { theme } from './system'

const Button = styled(BaseButton)`
  cursor: pointer;
  display: inline-block;
  border-radius: ${theme('rounded')};
  font-family: ${theme('fonts.sans')};
  font-size: ${theme('fontSizes.normal')};
  font-weight: 600;
  line-height: 1;
  position: relative;
  text-decoration: none;
  color: ${theme('colors.primary')};
  background-color: ${theme('colors.background')};
  padding: 6px 8px 5px;
  border: 1px solid ${theme('colors.primary')};
  border-right: none;
  white-space: nowrap;
  &:active,
  &:hover {
    filter: brightness(0.9);
  }
  &:first-child {
    border-radius: ${theme('rounded')} 0 0 ${theme('rounded')};
  }
  &:last-child {
    border-radius: 0 ${theme('rounded')} ${theme('rounded')} 0;

  }
`