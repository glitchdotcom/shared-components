import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TYPES = ['email', 'password', 'search', 'text'];

const InputPart = styled.span``

const InputWrap = styled.span``

const ErrorIconWrap = styled.span``

const Label = styled.label``

const Input = styled.input`
  ${({ type }) => ({
    search: styled.css`
    `
  })[type]}
`


const TextInput = React.forwardRef(({
  label,
  type,
  value,
  onChange,
  error,
  opaque,
  prefix,
  postfix,
  className,
  style,
  ...props
}, ref) => {
  return (
    <Label data-module="TextInput" className={className} style={style}>
      <VisuallyHidden>{label}</VisuallyHidden>
      <InputWrap opaque={opaque}>
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
            <InputErrorIcon />
          </ErrorIconWrap>
        )}
        {!!postfix && <InputPart>{postfix}</InputPart>}
      </InputWrap>
      {!!error && <InputErrorMessage>{error}</InputErrorMessage>}
    </Label>
  );
});