import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, DecorativeButton } from './button'

const PopoverToggle = styled.summary`
  &:before {
    content: "";
  }
`
const PopoverContent = styled.div`
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
`

const PopoverActions = styled.div`
  background-color: white;
  padding: 0.5em;
`

const ActionButtonWrap = styled.div`
  & + & {
    margin-top: 0.5em;
  }
`

export const PopoverMenu = ({ label, buttonProps = {}, options, onChange, ...props }) => {
  return (
    <details data-module="PopoverMenu" {...props}>
      <DecorativeButton as={PopoverToggle} {...buttonProps}>
        {label}
      </DecorativeButton>
      <PopoverContent>
        <PopoverActions>
          {options.map(option => (
              <ActionButtonWrap>
                <Button key={option.id}  size="small" onClick={(e) => onChange(option.id, e)}>{option.label}</Button>
              </ActionButtonWrap>
          ))}
        </PopoverActions>
      </PopoverContent>
    </details>
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
      },
      {
        id: 'bar', label: 'Bar',
      },
      {
        id: 'baz', label: 'Baz',
      }
    ]}
    onChange={(id) => console.log(id)}
  />
)