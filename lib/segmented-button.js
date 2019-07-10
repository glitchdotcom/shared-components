import React from 'react'
import styled from 'styled-components'
import { BaseButton } from './button'
import { theme } from './system'

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`

const Button = styled(BaseButton)`
  flex: 0 0 auto;
  cursor: pointer;
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
  border: 2px solid ${theme('colors.secondary')};
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
    border-right: 2px solid ${theme('colors.secondary')};
  }
  ${({ size }) =>
    ({
      small: styled.css`
        font-size: ${theme('fontSizes.tiny')};
        padding: 5px 6px 3px;
        border-width: 1px;
      `,
    }[size])}
`

export const SegmentedButton = ({ value, options, onChange, size }) => (
  <ButtonGroup data-module="SegmentedButton">
    {options.map(option => (
      <Button 
        key={option.id} 
        active={value === option.id} 
        onClick={(e) => onChange(option.id, e)}
        size={size}
      >
        {option.label}
      </Button>
    ))}
  </ButtonGroup>
)

const options = [
  {id: 'foo', label: 'Foo'},
  {id: 'bar', label: 'Bar'},
  {id: 'baz', label: 'Baz'},
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
        <SegmentedButton value={valueBig} onChange={onChangeBig} options={options} />
        <SegmentedButton size="small" value={valueSmall} onChange={onChangeSmall} options={options} />
      </Wrap>
    </>
  )
}