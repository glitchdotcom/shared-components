import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from './icon';
import { VisuallyHidden } from './visually-hidden'

const InputWrap = styled.span`
  display: flex;
  padding: var(--space-1) 0;
  ${({ variant }) => ({
    underline: styled.css`
      border-bottom: 1px solid var(--colors-border);
    `,
    opaque: styled.css`
      background-color: var(--colors-background);
      border: 1px solid var(--colors-border);
      border-radius: var(--rounded);
    `
  })[variant]}
`

const InputPart = styled.span`
`

const ErrorIcon = styled(Icon).attrs(() => ({ name: 'fireTruck', alt: 'Warning' }))`
  line-height: 1;
`

const Label = styled.label`
  display: block;
`

const Input = styled.input`
  min-width: 0;
  flex-grow: 1;
  background: none;
  border: none;
  box-shadow: none;
  padding: 0;
  transition: all .1s;
  font-size: var(--fontSizes-normal);
  font-family: var(--fonts-mono);
  &:focus {
    box-shadow: 0px 0px 3px 0px input-border-focused;
  }
  ${({ type }) => ({
    search: styled.css`
      background-image: url(search);
      background-repeat: no-repeat;
      background-position: right 5px center;
    `
  })[type]}
`

export const TextInput = React.forwardRef(({
  label,
  type,
  value,
  onChange,
  variant,
  error,
  prefix,
  postfix,
  labelProps,
  ...props
}, ref) => {
  return (
    <Label data-module="TextInput" {...labelProps}>
      <VisuallyHidden>{label}</VisuallyHidden>
      <InputWrap variant={variant}>
        {!!prefix && <InputPart>{prefix}</InputPart>}
        <Input          
          ref={ref}
          onChange={(evt) => onChange(evt.target.value, evt)}
          type={type}
          value={value}
          spellCheck={type !== 'email' && type !== 'password'}
          {...props}
        />
        {!!error && (
          <ErrorIconWrap>
            <Icon name="fireTruck" />
          </ErrorIconWrap>
        )}
        {!!postfix && <InputPart>{postfix}</InputPart>}
      </InputWrap>
      {!!error && <InputErrorMessage>{error}</InputErrorMessage>}
    </Label>
  );
});

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'search']),
  variant: PropTypes.oneOf(['underline', 'opaque']),
  error: PropTypes.node,
  prefix: PropTypes.node,
  postfix: PropTypes.node,
  labelProps: PropTypes.object,
}
TextInput.defaultProps = {
  type: "text",
  variant: "underline",
  error: null,
  prefix: null,
  postfix: null,
  labelProps: null,
}

const Container = styled.div`
`

export const story_TextInput = () => {
  const [value, onChange] = React.useState("")
  return (
    <TextInput label="example" placeholder="your name" value={value} onChange={(val) => onChange(val)} />
  )
}