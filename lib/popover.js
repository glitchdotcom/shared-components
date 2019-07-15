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

const createHandler = (el) => {
  const onKeyUp = (e) => {
    if (e.key === 'Escape') {
      el.open = false
    } 
  }
  window.addEventListener('keyup', onKeyUp)
  return {
    onKeyUp
  }
}

const clearHandler = (handlers) => {
  window.removeEventListener('keyup', handlers.onKeyUp)
}

export const PopoverMenu = ({ label, buttonProps = {}, options, onChange, ...props }) => {
  const [focusedIndex, setFocusedIndex] = React.useState(-1)
  const refs = React.useRef([])
  React.useEffect(() => {
    if (focusedIndex !== -1) {
      refs.current[focusedIndex].focus()
    }
  }, [focusedIndex])
  const open = focusedIndex !== -1
  const onToggle = (e) => {
    e.preventDefault()
    if (open) {
      setFocusedIndex(-1)
    } else {
      setFocusedIndex(0)
    }
  }
  // TODO: share the keyboard navigation with segmented button
  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setFocusedIndex(-1)
      return
    }

    let offset = 0
    if (e.key === 'UpArrow' || e.key === 'LeftArrow') {
      offset = -1
    } else if (e.key === 'DownArrow' || e.key === 'RightArrow') {
      offset = 1
    }
    if (offset === 0) return
    e.preventDefault()
    const nextIndex = (focusedIndex + offset + options.length) % options.length
    setFocusedIndex(nextIndex)
  }
  
  return (
    <PopoverContainer data-module="PopoverMenu" onToggle={onToggle} open={open} {...props}>
      <DecorativeButton as={PopoverToggle} {...buttonProps}>{label}</DecorativeButton>
      <PopoverContent>
        <PopoverActions>
          {options.map((option, index) => (
              <ActionButtonWrap key={option.id}>
                <Button 
                  size="small" 
                  onClick={(e) => onChange(option.id, e)} 
                  tabIndex={index === focusedIndex ? 0 : -1}
                  ref={(el) => refs.current[index] = el}
                >
                  {option.label}
                </Button>
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