import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { BaseButton, opticalPadding } from './button'
import { theme } from './system'

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`

const Button = styled(BaseButton)`
  flex: 0 0 auto;
  cursor: pointer;
  font-family: ${theme('fonts.sans')};
  font-size: ${theme('fontSizes.normal')};
  font-weight: 600;
  line-height: 1;
  position: relative;
  text-decoration: none;
  color: ${theme('colors.primary')};
  background-color: ${theme('colors.background')};
  ${opticalPadding}
  border: 2px solid ${theme('colors.primary')};
  border-right-style: none;
  white-space: nowrap;
  &:hover {
    filter: brightness(0.9);
  }
  ${({ active }) => active && styled.css`
    filter: brightness(0.9);
  `}
  &:first-child {
    border-radius: ${theme('rounded')} 0 0 ${theme('rounded')};
  }
  &:last-child {
    border-radius: 0 ${theme('rounded')} ${theme('rounded')} 0;
    border-right-style: solid;
  }
  ${({ size }) =>
    ({
      small: styled.css`
        font-size: ${theme('fontSizes.tiny')};
      `,
    }[size])}
`

const handleKeyDown = (options, refs, index, onChange) => (e) => {
  let offset = 0;
  if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
    offset = -1;
  }
  if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
    offset = 1;
  }
  if (!offset) return
  
  e.preventDefault()
  const nextIndex = (index + offset + options.length) % options.length
  const nextID = options[nextIndex].id
  onChange(nextID, e)
  refs.current[nextIndex].focus()
}

export const SegmentedButton = ({ value, options, onChange, size, ...props }) => {
  const refs = React.useRef([])
  
  return (
    <ButtonGroup data-module="SegmentedButton" role="radiogroup" {...props}>
      {options.map((option, i) => (
        <Button
          ref={(el) => {
            refs.current[i] = el
          }}
          key={option.id} 
          active={value === option.id}
          onClick={(e) => onChange(option.id, e)}
          size={size}
          // a11y, see https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20160317/examples/radio/radio.html
          tabIndex={value === option.id ? 0 : -1}
          aria-checked={value === option.id}
          onKeyDown={handleKeyDown(options, refs, i, onChange)}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  )
}
SegmentedButton.propTypes = {
  value: PropTypes.any.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any.isRequired,
    label: PropTypes.node.isRequired,
  }).isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
}
SegmentedButton.defaultProps = {
  size: 'large',
}

const options = [
  {id: 'foo', label: 'FooBar'},
  {id: 'bar', label: 'agogo'},
  {id: 'baz', label: 'BagLager'},
]

const Wrap = styled.div`
  margin: ${theme('space.2')};
`;


export const story_SegmentedButton = () => {
  const [valueBig, onChangeBig] = React.useState('foo')
  const [valueSmall, onChangeSmall] = React.useState('bar')
  return (
    <>
      <Wrap>
        <SegmentedButton value={valueBig} onChange={(id) => onChangeBig(id)} options={options} />    
      </Wrap>
      <Wrap>
        <SegmentedButton size="small" value={valueSmall} onChange={(id) => onChangeSmall(id)} options={options} />
      </Wrap>
    </>
  )
}