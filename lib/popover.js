import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, DecorativeButton } from './button'

const PopoverContainer = styled.details`
  position: relative;
  display: inline-block;
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
  padding: 0.5em;
  :focus-within {
    background-color: purple;
  }
`

const useClickOutside = (open, onClickOutside) => {
  const ref = React.useRef()
  React.useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (!ref.current.contains(e.target)) {
        onClickOutside(e)
      }
    }
    window.addEventListener('click', handler)
    return () => {
      window.removeEventListener('click', handler)
    }
  }, [open])
  return ref
}


export const PopoverMenu = ({ label, buttonProps = {}, options, onChange, ...props }) => {
  const [focusedIndex, setFocusedIndex] = React.useState(-1)
  const open = focusedIndex !== -1
  
  const rootRef = useClickOutside(open, () => {
    setFocusedIndex(-1)
  })
  const refs = React.useRef([])
  
  React.useEffect(() => {
    if (focusedIndex !== -1) {
      refs.current[focusedIndex].focus()
    }
  }, [focusedIndex])
  
  const onToggle = (e) => {
    // NOTE: this runs _after_ it toggles; we're updating the React state so that it matches the internal state
    if (e.target.open) {
      setFocusedIndex(0)
    } else {
      setFocusedIndex(-1)
    }
  }
  // TODO: share the keyboard navigation with segmented button
  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setFocusedIndex(-1)
      return
    }

    let offset = 0
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      offset = -1
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      offset = 1
    }
    if (offset === 0) return
    e.preventDefault()
    const nextIndex = (focusedIndex + offset + options.length) % options.length
    setFocusedIndex(nextIndex)
  }
  
  const closeAndChange = (id, e) => {
    setFocusedIndex(-1)
    onChange(id, e)
  }
  
  // see https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton
  return (
    <PopoverContainer data-module="PopoverMenu" ref={rootRef} onToggle={onToggle} open={open} role="menu" {...props}>
      <DecorativeButton 
        as={PopoverToggle} 
        {...buttonProps}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
      </DecorativeButton>
      <PopoverContent>
        <PopoverActions>
          {options.map((option, index) => (
              <ActionButtonWrap key={option.id}>
                <Button 
                  size="small" 
                  onClick={(e) => closeAndChange(option.id, e)} 
                  tabIndex={index === focusedIndex ? 0 : -1}
                  ref={(el) => refs.current[index] = el}
                  onKeyDown={onKeyDown}
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