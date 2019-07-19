import React from 'react'
import styled from 'styled-components'

export const Progress = styled.progress`
  appearance: none[]
  height: 9px
  width: 70px
  border: 1px solid currentColor
  // firefox
  background-color: transparent
  border-radius: 5px

  // ugly prefixes sadly required
  &::-webkit-progress-bar {
    background-color: transparent;
  }
  &::-webkit-progress-value {
    background-color: currentColor;
    border-radius: 3px;
  }
  &::-moz-progress-bar {
    background-color: currentColor;
    border-radius: 3px;
  }
`
