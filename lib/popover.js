import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, DecorativeButton } from './button'
import { onArrowKeys } from './keyboard-navigation'

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
  z-index: 1;
`

const PopoverInfo = styled.div`
  background-color: #ccc;
  padding: 0.5em;
  flex: 0 0 auto;
`

const PopoverActions = styled.div`
  background-color: white;
  padding: 0.5em;
  flex: 0 0 auto;
`

const PopoverDangerActions = styled.div`
  background-color: pink;
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


export const PopoverMenu = ({ label, buttonProps = {}, children, ...props }) => {
  const [open, setOpen] = React.useState(false)
  
  const rootRef = useClickOutside(open, () => {
    setOpen(false)
  })
      
  const onToggle = (e) => {
    // NOTE: this runs _after_ it toggles; we're updating the React state so that it matches the internal state
    setOpen(e.target.open)
  }
  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false)
      return
    }
  }
  
  // see https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton
  return (
    <PopoverContainer data-module="PopoverMenu" ref={rootRef} onToggle={onToggle} open={open} role="menu" {...props}>
      <DecorativeButton 
        as={PopoverToggle}
        onKeyDown={onKeyDown}
        {...buttonProps}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
      </DecorativeButton>
      {children({ open, onClose: () => setOpen(false) })}
    </PopoverContainer>
  )
}
PopoverMenu.propTypes = {
  label: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
  buttonProps: PropTypes.object,
}

const PopoverActionsList = ({ options, open, onClose }) => {
  const refs = React.useRef([])
  const [focusedIndex, setFocusedIndex] = React.useState(open ? 0 : -1)
  React.useEffect(() => {
    setFocusedIndex(open ? 0 : -1)
  }, [open])
  
  React.useEffect(() => {
    if (focusedIndex !== -1) {
      refs.current[focusedIndex].focus()
    }
  }, [focusedIndex])
  
  const closeAndChange = ({ onClick, id }, e) => {
    onClose(e)
    onClick(id, e)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose(e)     
      return
    }
    const nextIndex = onArrowKeys(e, focusedIndex, options)
    if (nextIndex !== null) {
      setFocusedIndex(nextIndex)  
    }   
  }
  
  return (
    <PopoverContent>
      <PopoverActions>
        {options.map((option, index) => (
            <ActionButtonWrap key={option.id}>
              <Button 
                size="small" 
                onClick={(e) => closeAndChange(option, e)} 
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
  )
}

PopoverActionsList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func.isRequired,
    }).isRequired,
  ).isRequired,
}

export const story_PopoverMenu = () => (
  <PopoverMenu label="Delete Team">
    {({ open, onClose }) => (
      <PopoverContent>
        <PopoverInfo>
          <p>Deleting this team will remove this team page. No projects will be deleted, but only current project members will be able to edit them.</p>
        </PopoverInfo>
        <PopoverDangerActions>
          <Button size="small" variant="secondary" onClick={() => console.log('boom')}>
            Delete Team
          </Button>
        </PopoverDangerActions>
      </PopoverContent>
    )}
  </PopoverMenu>
)


export const story_PopoverMenu_Actions_List = () => (
  <PopoverMenu label="Options">
    {({ open, onClose }) => 
      <PopoverActionsList
        open={open}
        onClose={onClose}
        options={[
          {
            id: 'foo', label: 'Foo', onClick: () => {},
          },
          {
            id: 'bar', label: 'Bar', onClick: () => {},
          },
          {
            id: 'baz', label: 'Baz', onClick: () => {},
          }
        ]}
      />
    }
  </PopoverMenu>
)