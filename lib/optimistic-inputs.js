import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, WrappingTextInput } from './text-input';

import { code, CodeExample, PropsDefinition, Prop } from './story-utils';
import usePassivelyTrimmedInput from './hooks/use-passively-trimmed-input';
import useOptimisticValue from './hooks/use-optimistic-value';

export const OptimisticTextInput = ({ value, onChange, onBlur, ...props }) => (
  <OptimisticInput
    Component={TextInput}
    {...props}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
  />
);

OptimisticTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export const StoryOptimisticTextInput = () => {
  const [successInputState, setSuccessInputState] = useState('');
  const [failedInputState, setFailedInputState] = useState('');
  return (
    <>
      <p>
        The OptimisticTextInput component renders a <a href="https://reactjs.org/docs/forms.html#controlled-components">controlled text input</a>{' '}
        whose validity depends on a server call. It relies on useOptimsticValue which works like this:
      </p>
      <ul>
        <li>takes in an initial value for the input (this representes the real value the server last gave us)</li>
        <li>takes in a way to update the server</li>
      </ul>
      on change:
      <ul>
        <li>we show them what they are typing (or editing in case of checkbox, etc), and OPTIMISTICALLY assume it all went according to plan</li>
        <li>
          if the server hits an error:
          <ul>
            <li>we display that error to the user</li>
            <li>and we continue to show what the user's input even though it's not saved</li>
          </ul>
        </li>
        <li>
          if the server succeeds:
          <ul>
            <li>
              we pass along the response so that it can be stored in top level state later and passed back in again as props as the initial "real"
              value
            </li>
          </ul>
        </li>
        <li>
          on blur:
          <ul>if the user was in an errored state, we show the last saved good state and remove the error</ul>
        </li>
      </ul>
      <CodeExample>
        {code`
        const [inputState, setInputState] = useState();

        <OptimisticTextInput
          label="Optimistic Input that will succeed"
          value={inputState}
          onChange={async (newValue) => {
            // value changed; validate it with the server
            await validateWithApi(); // should return a promise that either resolves or fails with an API error
            setInputState(newValue);
          }}
        />
        <OptimisticTextInput
          label="Optimistic Input that will fail"
          value={inputState}
          onChange={async (newValue) => {
            // value changed; validate it with the server
            // lets pretend this one is going to fail; the rejection should look like this
            await Promise.reject({response: {data: {message: "It's an error"}}});
            setInputState(newValue);
          }}
        />
        `}
      </CodeExample>
      <PropsDefinition>
        <Prop name="label" required>
          Label for the text input
        </Prop>
        <Prop name="value" required>
          Value of the text input.
        </Prop>
        <Prop name="onChange" required>
          Function to call when the value changes.
        </Prop>
        <Prop name="onBlur" />
      </PropsDefinition>
      <OptimisticTextInput
        label="Optimistic Input that will succeed"
        value={successInputState}
        onChange={async (newValue) => {
          // value changed; validate it with the server
          await Promise.resolve();
          setSuccessInputState(newValue);
        }}
      />
      <OptimisticTextInput
        label="Optimistic Input that will fail"
        value={failedInputState}
        onChange={async (newValue) => {
          // value changed; validate it with the server
          // lets pretend this one failed
          await Promise.reject({ response: { data: { message: "It's an error" } } });
          setFailedInputState(newValue);
        }}
      />
    </>
  );
};

export const OptimisticInput = ({ Component, value, onChange, onBlur, ...props }) => {
  const [untrimmedValue, onChangeWithTrimmedInputs, onBlurWithTrimmedInputs] = usePassivelyTrimmedInput(value, onChange, onBlur);
  const [optimisticValue, optimisticOnChange, optimisticOnBlur, optimisticError] = useOptimisticValue(
    untrimmedValue,
    onChangeWithTrimmedInputs,
    onBlurWithTrimmedInputs,
  );

  return <Component {...props} value={optimisticValue} error={optimisticError} onChange={optimisticOnChange} onBlur={optimisticOnBlur} />;
};

OptimisticInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  Component: PropTypes.elementType.isRequired,
};

export default OptimisticInput;

export const Story_OptimisticInput = () => {
  const [successInputState, setSuccessInputState] = useState('');
  const [failedInputState, setFailedInputState] = useState('');
  return (
    <>
      <p>
        Use this component to make any kind of input you want into one that behaves like <a href="#StoryOptimisticTextInput">Optimistic Text Input</a>.
      </p>
      <CodeExample>
        {code`
        const [inputState, setInputState] = useState();

        <OptimisticInput
          Component={WrappingTextInput}
          label="Optimistic Wrapping Text Input that will succeed"
          value={inputState}
          onChange={async (newValue) => {
            // value changed; validate it with the server
            await validateWithApi(); // should return a promise that either resolves or fails with an API error
            setInputState(newValue);
          }}
        />
        <OptimisticInput
          Component={WrappingTextInput}
          label="Optimistic WrappingTextInput that will fail"
          value={inputState}
          onChange={async (newValue) => {
            // value changed; validate it with the server
            // lets pretend this one is going to fail; the rejection should look like this
            await Promise.reject({response: {data: {message: "It's an error"}}});
            setInputState(newValue);
          }}
        />
        `}
      </CodeExample>
      <PropsDefinition>
        <Prop name="Component" required>
          Component to use as the base. Should accept props including at least <code>value</code>, <code>error</code>, <code>onChange</code>, and{' '}
          <code>onBlur</code>.
        </Prop>
        <Prop name="label" required>
          Label for the text input
        </Prop>
        <Prop name="value" required>
          Value of the text input.
        </Prop>
        <Prop name="onChange" required>
          Function to call when the value changes.
        </Prop>
        <Prop name="onBlur" />
      </PropsDefinition>
      <div style={{ maxWidth: '150px' }}>
        <OptimisticInput
          Component={WrappingTextInput}
          label="Optimistic Wrapping Input that will succeed"
          value={successInputState}
          onChange={async (newValue) => {
            // value changed; validate it with the server
            await Promise.resolve();
            setSuccessInputState(newValue);
          }}
        />
        <OptimisticInput
          Component={WrappingTextInput}
          label="Optimistic Wrapping Input that will fail"
          value={failedInputState}
          onChange={async (newValue) => {
            // value changed; validate it with the server
            // lets pretend this one failed
            await Promise.reject({ response: { data: { message: "It's an error" } } });
            setFailedInputState(newValue);
          }}
        />
      </div>
    </>
  );
};
