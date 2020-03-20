import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { TextInput, WrappingTextInput } from './text-input';

import { code, CodeExample, PropsDefinition, Prop } from './story-utils';
import usePassivelyTrimmedInput from './hooks/use-passively-trimmed-input';
import useOptimisticValue from './hooks/use-optimistic-value';

export const OptimisticTextInput = ({ value, onChange, onBlur, ...props }) => {
  const [untrimmedValue, onChangeWithTrimmedInputs, onBlurWithTrimmedInputs] = usePassivelyTrimmedInput(value, onChange, onBlur);
  const [optimisticValue, optimisticOnChange, optimisticOnBlur, optimisticError] = useOptimisticValue(
    untrimmedValue,
    onChangeWithTrimmedInputs,
    onBlurWithTrimmedInputs,
  );

  return <TextInput {...props} value={optimisticValue} onChange={optimisticOnChange} onBlur={optimisticOnBlur} error={optimisticError} />;
};

OptimisticTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export const StoryOptimsticTextInput = () => {
  const [successInputState, setSuccessInputState] = useState('');
  const [failedInputState, setFailedInputState] = useState('');
  return (
    <>
      <p>
        The OptimisticTextInput component renders a <a href="https://reactjs.org/docs/forms.html#controlled-components">controlled text input</a> whose validity depends on a server call. It relies on useOptimsticValue which works
        like this:
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
          await Promise.reject({response: {data: {message: "It's an error"}}});
          setFailedInputState(newValue);
        }}
      />
    </>
  );
};

export const OptimisticWrappingTextInput = ({ value, onChange, onBlur, ...props }) => {
  const [untrimmedValue, onChangeWithTrimmedInputs, onBlurWithTrimmedInputs] = usePassivelyTrimmedInput(value, onChange, onBlur);
  const [optimisticValue, optimisticOnChange, optimisticOnBlur, optimisticError] = useOptimisticValue(
    untrimmedValue,
    onChangeWithTrimmedInputs,
    onBlurWithTrimmedInputs,
  );

  return <WrappingTextInput {...props} value={optimisticValue} error={optimisticError} onChange={optimisticOnChange} onBlur={optimisticOnBlur} />;
};

OptimisticWrappingTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OptimisticWrappingTextInput;

export const StoryOptimsticWrappingTextInput = () => {
  const [successInputState, setSuccessInputState] = useState('');
  const [failedInputState, setFailedInputState] = useState('');
  return (
    <>
      <p>
        The OptimisticWrappingTextInput is like an <a href="#StoryOptimisticTextInput">Optimistic Text Input</a>, but using a <a href="#WrappingTextInput">Wrapping Text Input</a>.
      </p>
      <CodeExample>
        {code`
        const [inputState, setInputState] = useState();

        <OptimisticWrappingTextInput
          label="Optimistic Wrapping Text Input that will succeed"
          value={inputState}
          onChange={async (newValue) => {
            // value changed; validate it with the server
            await validateWithApi(); // should return a promise that either resolves or fails with an API error
            setInputState(newValue);
          }}
        />
        <OptimisticWrappingTextInput
          label="Optimistic Wrapping Input that will fail"
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
      <div style={{maxWidth: '150px'}}>
      <OptimisticWrappingTextInput
        label="Optimistic Wrapping Input that will succeed"
        value={successInputState}
        onChange={async (newValue) => {
          // value changed; validate it with the server
          await Promise.resolve();
          setSuccessInputState(newValue);
        }}
      />
      <OptimisticWrappingTextInput
        label="Optimistic Wrapping Input that will fail"
        value={failedInputState}
        onChange={async (newValue) => {
          // value changed; validate it with the server
          // lets pretend this one failed
          await Promise.reject({response: {data: {message: "It's an error"}}});
          setFailedInputState(newValue);
        }}
      />
      </div>
    </>
  );
};