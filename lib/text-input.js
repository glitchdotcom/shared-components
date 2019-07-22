import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { Icon } from './icon';
import { VisuallyHidden } from './visually-hidden';

import { Box } from './box';

const InputWrap = styled.span`
  position: relative;
  display: flex;
  align-items: baseline;
  ${({ variant }) => variants[variant]}
`;
const variants = {
  underline: styled.css`
    border-bottom: 1px solid var(--colors-border);
  `,
  opaque: styled.css`
    background-color: var(--colors-background);
    border: 1px solid var(--colors-border);
  `,
};

const InputPart = styled.span`
  & + & {
    margin-left: var(--space-1);
  }
`;

const InputErrorMessage = styled.span`
  color: var(--colors-error-text);
  background-color: var(--colors-error-background);
  border-radius: 0 0 var(--rounded) var(--rounded);
  display: block;
  font-weight: 600
  font-size: var(--fontSizes-small);
  padding: 0.25em 0.5em;
`;

const SearchIcon = styled(Icon).attrs(() => ({ icon: 'search' }))`
  position: absolute;
  right: 0.4em;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const ErrorIcon = styled(Icon).attrs(() => ({ icon: 'fireEngine', alt: 'Warning' }))`
  font-size: var(--fontSizes-bigger);
`;

const Label = styled.label`
  display: block;
`;

const Input = styled(InputPart).attrs(() => ({ as: 'input' }))`
  min-width: 0;
  flex-grow: 1;
  background: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
  transition: all 0.1s;
  font-size: inherit;
  font-family: var(--fonts-mono);
  padding: 0.25em 0 0.125em;
  color: var(--colors-primary);
  z-index: 1;
  &::placeholder {
    color: var(--colors-secondary);
  }
  ${({ variant }) =>
    ({
      opaque: styled.css`
        padding-left: var(--space-1);
        padding-right: var(--space-1);
      `,
    }[variant])}
`;

const inputTypes = ['text', 'email', 'password', 'search'];

export const TextInput = React.forwardRef(({ label, type, value, onChange, variant, error, prefix, postfix, labelProps, ...props }, ref) => (
  <Label data-module="TextInput" {...labelProps}>
    <VisuallyHidden>{label}</VisuallyHidden>
    <InputWrap variant={variant}>
      {!!prefix && <InputPart>{prefix}</InputPart>}
      <Input
        ref={ref}
        variant={variant}
        onChange={(evt) => onChange(evt.target.value, evt)}
        type={type}
        value={value}
        spellCheck={type !== 'email' && type !== 'password'}
        {...props}
      />
      {type === 'search' && <SearchIcon />}
      {!!error && <ErrorIcon />}
      {!!postfix && <InputPart>{postfix}</InputPart>}
    </InputWrap>
    {!!error && <InputErrorMessage>{error}</InputErrorMessage>}
  </Label>
));

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(inputTypes),
  variant: PropTypes.oneOf(Object.keys(variants)),
  error: PropTypes.node,
  prefix: PropTypes.node,
  postfix: PropTypes.node,
  labelProps: PropTypes.object,
};
TextInput.defaultProps = {
  type: 'text',
  variant: 'underline',
  error: null,
  prefix: null,
  postfix: null,
  labelProps: null,
};

const TextAreaErrorIcon = styled(ErrorIcon)`
  position: absolute;
  bottom: 0.25em;
  right: 0;
`;

const TextAreaContent = styled(Input).attrs(() => ({ as: TextareaAutosize }))`
  resize: none;
`;

export const TextArea = React.forwardRef(({ label, value, onChange, variant, error, labelProps, ...props }, ref) => (
  <Label data-module="TextArea" {...labelProps}>
    <VisuallyHidden>{label}</VisuallyHidden>
    <InputWrap variant={variant}>
      <TextAreaContent variant={variant} ref={ref} onChange={(evt) => onChange(evt.target.value, evt)} value={value} {...props} />
      {!!error && <TextAreaErrorIcon />}
    </InputWrap>
    {!!error && <InputErrorMessage>{error}</InputErrorMessage>}
  </Label>
));

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)),
  error: PropTypes.node,
  labelProps: PropTypes.object,
};
TextInput.defaultProps = {
  variant: 'underline',
  error: null,
  labelProps: null,
};

export const useInputState = (initialValue) => {
  const [value, setValue] = React.useState(initialValue);
  const onChange = (val) => setValue(val);
  return { value, onChange };
};

export const useValidatedState = (initialValue, validate) => {
  const [value, setValue] = React.useState(initialValue);
  const [error, setError] = React.useState(null);

  const validated = validate(value);

  // if currently _invalid_, update error on every change
  React.useEffect(() => {
    if (error) setError(validated);
  }, [validated, error]);

  const onChange = (val) => setValue(val);

  // if currently _valid_, update error on blur
  const onBlur = React.useCallback(() => {
    setError(validated);
  }, [validated]);

  return { value, error, onChange, onBlur };
};

const Container = styled((props) => <Box rounded variant="highlight" padding={1} mx={0} {...props} />)`
  max-width: 400px;
  & > * + * {
    margin-top: var(--space-1);
  }
`;

const validateEmail = (email) => {
  if (!email) return 'Email cannot be blank';
  if (!/^\w+@\w+\.\w+$/.test(email)) return 'Email is invalid';
  return null;
};

const validateDescription = (desc) => {
  if (!desc) return 'Description cannot be blank';
  return null;
};

export const StoryTextInput_and_TextArea = () => {
  return (
    <Container>
      <TextInput label="name" placeholder="your name" {...useInputState('')} />
      <TextInput type="email" label="email" placeholder="your email" {...useValidatedState('', validateEmail)} />
      <TextInput type="search" label="search" placeholder="lib/text-input.js" variant="opaque" {...useInputState('')} />
      <TextInput type="password" label="password" placeholder="password" prefix={<Icon icon="private" />} {...useInputState('')} />
      <TextArea label="description" placeholder="description" minRows={3} {...useValidatedState('', validateDescription)} />
      <TextArea
        label="report abuse"
        minRows={3}
        variant="opaque"
        {...useValidatedState("[Something here] doesn't seem appropriate for Glitch because...", validateDescription)}
      />
    </Container>
  );
};
