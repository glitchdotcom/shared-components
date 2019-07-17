import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
            <InputErrorIcon />
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
  type: PropTypes.oneOf(['text', 'email', 'password', 'search']),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
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