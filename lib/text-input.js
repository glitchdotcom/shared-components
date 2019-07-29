import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { Icon } from './icon';
import { VisuallyHidden } from './visually-hidden';
import { code, CodeExample } from './story-utils';

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
  color: var(--colors-placeholder);
`;

const ErrorIcon = styled(Icon).attrs(() => ({ icon: 'fireEngine', alt: 'Warning' }))`
  font-size: var(--fontSizes-bigger);
`;

const Label = styled.label`
  display: block;
`;

const inputStyles = styled.css`
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
    color: var(--colors-placeholder);
  }
  ${({ variant }) =>
    ({
      opaque: styled.css`
        padding-left: var(--space-1);
        padding-right: var(--space-1);
      `,
    }[variant])}
`;

const Input = styled.input`
  ${inputStyles}
`;

const Prefix = styled.span`
  margin-right: var(--space-1);
`;
const Postfix = styled.span`
  margin-left: var(--space-1);
`;

const inputTypes = ['text', 'email', 'password', 'search'];

export const TextInput = React.forwardRef(
  ({ label, type, value, onChange, variant, placeholder, error, prefix, postfix, containerProps, ...props }, ref) => (
    <Label data-module="TextInput" {...containerProps}>
      <VisuallyHidden>{label}</VisuallyHidden>
      <InputWrap variant={variant}>
        {!!prefix && <Prefix>{prefix}</Prefix>}
        <Input
          ref={ref}
          variant={variant}
          onChange={(evt) => onChange(evt.target.value, evt)}
          type={type}
          value={value}
          spellCheck={type === 'text'}
          placeholder={typeof placeholder === 'string' ? placeholder : label}
          {...props}
        />
        {type === 'search' && <SearchIcon />}
        {!!error && <ErrorIcon />}
        {!!postfix && <Postfix>{postfix}</Postfix>}
      </InputWrap>
      {!!error && <InputErrorMessage>{error}</InputErrorMessage>}
    </Label>
  ),
);

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(inputTypes),
  variant: PropTypes.oneOf(Object.keys(variants)),
  placeholder: PropTypes.string,
  error: PropTypes.node,
  prefix: PropTypes.node,
  postfix: PropTypes.node,
  containerProps: PropTypes.object,
};
TextInput.defaultProps = {
  type: 'text',
  variant: 'underline',
  placeholder: null,
  error: null,
  prefix: null,
  postfix: null,
  containerProps: null,
};

export const StoryTextInput = () => (
  <>
    <p>The TextInput component renders single-line text-based form fields with accessible labels.</p>
    <CodeExample>{`<TextInput label="name" value={name} onChange={setName} />`}</CodeExample>
    <h3>props</h3>
    <dl>
      <dt>
        label <em>(required)</em>
      </dt>
      <dd>The label for this field as it appears to screen readers and (by default) as placeholder text.</dd>
      <dt>
        value <em>(required)</em>
      </dt>
      <dd>The value of the form input.</dd>
      <dt>
        onChange <em>(required)</em>
      </dt>
      <dd>A callback function, which is called with the input's new value on change events.</dd>
      <dt>type</dt>
      <dd>"text", "email", "password", or "search" (default "text").</dd>
      <dt>variant</dt>
      <dd>The input's visual style: "underline" or "opaque" (default "underline").</dd>
      <dt>placeholder</dt>
      <dd>Custom text for the placeholder (defaults to the "label" value).</dd>
      <dt>error</dt>
      <dd>Content to be rendered as an error message.</dd>
      <dt>prefix</dt>
      <dd>Content to be rendered to the left of the input.</dd>
      <dt>postfix</dt>
      <dd>Content to be rendered to the right of the input.</dd>
      <dt>containerProps</dt>
      <dd>
        Additional props to apply to the <em>container</em> (instead of the input itself).
      </dd>
    </dl>
    <p>All other props are forwarded to the input element.</p>
  </>
);

const TextAreaErrorIcon = styled(ErrorIcon)`
  position: absolute;
  bottom: 0.25em;
  right: 0;
`;

const TextAreaContent = styled(TextareaAutosize)`
  ${inputStyles}
  resize: none;
`;

export const TextArea = React.forwardRef(({ label, value, onChange, variant, error, containerProps, placeholder, ...props }, ref) => (
  <Label data-module="TextArea" {...containerProps}>
    <VisuallyHidden>{label}</VisuallyHidden>
    <InputWrap variant={variant}>
      <TextAreaContent
        variant={variant}
        ref={ref}
        onChange={(evt) => onChange(evt.target.value, evt)}
        value={value}
        placeholder={typeof placeholder === 'string' ? placeholder : label}
        {...props}
      />
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
  containerProps: PropTypes.object,
};
TextArea.defaultProps = {
  variant: 'underline',
  error: null,
  containerProps: null,
};

export const StoryTextArea = () => (
  <>
    <p>The TextArea component renders multi-line text-based form fields with accessible labels and automatic resizing.</p>
    <CodeExample>{`<TextArea label="description" value={descriptions} onChange={setDescription} />`}</CodeExample>
    <h3>props</h3>
    <dl>
      <dt>
        label <em>(required)</em>
      </dt>
      <dd>The label for this field as it appears to screen readers and (by default) as placeholder text.</dd>
      <dt>
        value <em>(required)</em>
      </dt>
      <dd>The value of the form input.</dd>
      <dt>
        onChange <em>(required)</em>
      </dt>
      <dd>A callback function, which is called with the input's new value on change events.</dd>
      <dt>variant</dt>
      <dd>The input's visual style: "underline" or "opaque" (default "underline").</dd>
      <dt>placeholder</dt>
      <dd>Custom text for the placeholder (defaults to the "label" value).</dd>
      <dt>error</dt>
      <dd>Content to be rendered as an error message.</dd>
      <dt>containerProps</dt>
      <dd>
        Additional props to apply to the <em>container</em> (instead of the input itself).
      </dd>
    </dl>
    <p>
      All other props are forwarded to an instance of <a href="https://github.com/andreypopp/react-textarea-autosize">react-textarea-autosize</a>.
    </p>
  </>
);

const useInputState = (initialValue) => {
  const [value, setValue] = React.useState(initialValue);
  const onChange = (val) => setValue(val);
  return { value, onChange };
};

const Container = styled.div`
  background-color: var(--colors-secondaryBackground);
  padding: var(--space-1);
  border-radius: var(--rounded);
  max-width: 400px;
  > * + * {
    margin-top: var(--space-1);
  }
`;

export const StoryTextInput_and_TextArea_variants = () => (
  <>
    <h3>underline</h3>
    <Container>
      <TextInput label="name" {...useInputState('stingy-argument')} />
      <TextArea label="description" minRows={3} {...useInputState('Feature: TextInput and TextArea components')} />
    </Container>
    <h3>opaque</h3>
    <Container>
      <TextInput type="search" label="search" placeholder="lib/text-input.js" variant="opaque" {...useInputState('')} />
      <TextArea
        label="report abuse"
        variant="opaque"
        minRows={4}
        {...useInputState("[Something here] doesn't seem appropriate for Glitch because...")}
      />
    </Container>
  </>
);

const validateEmail = (email) => {
  if (!email) return 'Email cannot be blank';
  if (!/^\w+@\w+\.\w+$/.test(email)) return 'Email is invalid';
  return null;
};

const validateDescription = (desc) => {
  if (!desc) return 'Description cannot be blank';
  return null;
};

const useValidatedState = (initialValue, validate) => {
  const { value, onChange } = useInputState(initialValue);
  const [error, setError] = React.useState(null);

  const validated = validate(value);

  // if currently _invalid_, update error on every change
  React.useEffect(() => {
    if (error) setError(validated);
  }, [validated, error]);

  // if currently _valid_, update error on blur
  const onBlur = React.useCallback(() => {
    setError(validated);
  }, [validated]);

  return { value, error, onChange, onBlur };
};

const validatePassword = (password) => {
  if (!password) return 'Password cannot be blank';
  if (password.length < 6) return 'Password must be 6 characters or more';
  if (password === 'password') return 'Password is too weak';
  return null;
};

const usePasswordState = () => {
  const checkMatch = (matchValue) => {
    if (passwordState.value !== matchValue) return 'Passwords do not match';
    return null;
  };
  const passwordState = useValidatedState('', validatePassword);
  const matchState = useValidatedState('', checkMatch);
  return [passwordState, matchState];
};

const PrivateIcon = styled(Icon).attrs(() => ({ icon: 'private' }))`
  color: #ab933b;
`;

export const StoryTextInput_and_TextArea_validation = () => {
  const [passwordState, repeatPasswordState] = usePasswordState();
  return (
    <Container>
      <TextInput type="email" label="email" {...useValidatedState('', validateEmail)} />
      <TextInput type="password" label="password" prefix={<PrivateIcon />} {...passwordState} />
      <TextInput type="password" label="repeat password" prefix={<PrivateIcon />} {...repeatPasswordState} />
      <TextArea label="description" minRows={3} {...useValidatedState('', validateDescription)} />
    </Container>
  );
};

const BoldTextInput = styled(TextInput)`
  font-weight: bold;
`;

export const StoryTextInput_and_TextArea_overrides = () => (
  <>
    <p>
      The styles and behavior of TextInput and TextArea components can be overridden with the "className" or "as" props, or by wrapping in a{' '}
      <code>styled</code> helper.
    </p>
    <CodeExample>
      {code`
        const BoldTextInput = styled(TextInput)\`
          font-weight: bold;
        \`;

        <BoldTextInput label="name" value={name} onChange={setName} />
      `}
    </CodeExample>
    <Container>
      <BoldTextInput label="name" {...useInputState('stingy-argument')} />
    </Container>
  </>
);
