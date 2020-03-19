import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { TextInput } from './text-input';

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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export const StoryOptimsticTextInput = () => {
  const [inputState, setInputState] = useState('');
  return (
    <>
      <p>
        The OptimisticTextInput component renders an text input whose validity depends on a server call. It relies on useOptimsticValue which works
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
      <OptimisticTextInput
        label="Team Name"
        value={inputState}
        onChange={async (newValue) => {
          console.log('value changed; validate it with the server');
          await Promise.resolve();
          setInputState(newValue);
        }}
      />
        `}
      </CodeExample>
      <PropsDefinition>
        <Prop name="value" required />
        <Prop name="onChange" required>
          Function to call when the value changes.
        </Prop>
        <Prop name="onBlur" />
      </PropsDefinition>
      <OptimisticTextInput
        label="Team Name"
        value={inputState}
        onChange={async (newValue) => {
          console.log('value changed; validate it with the server');
          await Promise.reject({response: {data: {message: "It's an error"}}});
          setInputState(newValue);
        }}
        
      />
    </>
  );
};
