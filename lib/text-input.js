import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from './icon';
import { VisuallyHidden } from './visually-hidden'

const InputWrap = styled.span`
  display: flex;
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

const tinyPadding = styled.css`
  padding: 0.25em 0 0.125em;
`

const InputPart = styled.span`
  ${tinyPadding};
`

const InputErrorMessage = styled.span`
  color: var(--colors-error-text);
  background-color: var(--colors-error-background);
  border-radius: 0 0 var(--rounded) var(--rounded);
  display: block;
  font-weight: 600
  font-size: var(--fontSizes-small);
  padding: 0.25em 0.5em;
`

const ErrorIcon = styled(Icon).attrs(() => ({ icon: 'fireEngine', alt: 'Warning' }))`
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
  ${tinyPadding}
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
        {!!error && <ErrorIcon />}
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
  background-color: var(--colors-secondaryBackground);
  border-radius: var(--rounded);
  padding: var(--space-1);
  max-width: 300px;
  & > * {
    margin: var(--space-1) 0;
  }
`

const useValidatedState = (initialValue, validate) => {
  const [value, onChange] = React.useState(initialValue)
  const [error, setError] = React.useState(null)
  
  // if _invalid_, check for validity on every change
  React.useEffect(() => {
    if (error) setError(validate(value))
  }, [value, error])
  
  // if _valid_, check for validity on blur
  const onBlur = React.useCallback(() => {
    setError(validate(value))
  }, [value])
  
  return { value, error, onChange, onBlur };
}

const validateEmail = (email) => {
  if (!email) return "Email cannot be blank";
  if (!/^\w+@\w+\.\w+$/.test(email)) return "Email is invalid";
  return null;
}

export const story_TextInput = () => {
  const [name, setName] = React.useState("")
  const { value: email, error: emailError, onChange: setEmail, onBlur: onBlurEmail } = useValidatedState("", validateEmail)
  return (
    <Container>
      <TextInput label="name" placeholder="your name" value={name} onChange={(val) => setName(val)} />
      <TextInput 
        type="email" 
        label="email" 
        placeholder="your email" 
        value={email} 
        onChange={(val) => setEmail(val)}
        error={emailError}
        onBlur={onBlurEmail} 
      />
    </Container>
  )
}