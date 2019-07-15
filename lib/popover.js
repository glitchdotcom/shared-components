import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, DecorativeButton } from './button'

const PopoverContainer = styled.details`
  position: relative;
`

const PopoverToggle = styled.summary`
  list-style-image: none;
  &::-webkit-details-marker {
    display: none;
    background: none;
    color: transparent;
    width: 0;
  }
`
const PopoverContent = styled.div`
  border: 1px solid #ccc;
  position: absolute;
  min-width: 200px;
`

const PopoverActions = styled.div`
  background-color: white;
  padding: 0.5em;
  flex: 0 0 auto;
`

const ActionButtonWrap = styled.div`
  & + & {
    margin-top: 0.5em;
  }
`

export const PopoverMenu = ({ label, buttonProps = {}, options, onChange, ...props }) => {
  const handlerRef = React.useRef(null)
  const onToggle = (e) => {
    
    
  }
  return (
    <PopoverContainer data-module="PopoverMenu" onToggle={onToggle} {...props}>
      <DecorativeButton as={PopoverToggle} {...buttonProps}>{label}</DecorativeButton>
      <PopoverContent>
        <PopoverActions>
          {options.map(option => (
              <ActionButtonWrap key={option.id}>
                <Button size="small" onClick={(e) => onChange(option.id, e)}>{option.label}</Button>
              </ActionButtonWrap>
          ))}
        </PopoverActions>
      </PopoverContent>
    </PopoverContainer>
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