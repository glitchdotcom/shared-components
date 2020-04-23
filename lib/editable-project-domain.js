import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { OptimisticTextInput } from './optimistic-inputs';
import { CodeExample, PropsDefinition, Prop } from './story-utils';
import { Button } from './button';

/*
  Editable Project Domain (aka project name):
  - does not control permissions/authorization
  - has internal state:
    - this lets a user type out invalid and in-progress names without necessarily updating the page state
  - expects to be within external state that can be updated with onChange and onBlur:
    - onChange should be used to persist changes everytime the user types (also potentially updating the url in the browser so as to more gracefully handle refreshes)
    - onBlur should be used to update state globally (no need to cause global rerenders until we're ready)
*/
export const EditableProjectDomain = ({ initialName, onChange, onBlur }) => {
  const [headingState, setHeadingState] = useState(initialName);
  const handleOnChange = async (newName) => {
    setHeadingState(newName);
    if (onChange) {
      await onChange(newName);
    }
  };
  const handleOnBlur = () => {
    if (onBlur) {
      onBlur(headingState);
    }
  };

  return (
    <OptimisticTextInput
      label="Project Domain"
      value={headingState}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      placeholder="Name your project"
    />
  );
};
EditableProjectDomain.propTypes = {
  initialName: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
EditableProjectDomain.defaultProps = {
  initialName: '',
  onChange: null,
  onBlur: null,
};

export const StoryEditableProjectDomain = () => {
  const [mockError, setMockError] = useState(false);
  return (
  <>
    <p>The EditableProjectDomain Component is a souped up OptimisticTextInput designed for when users want to edit their project domain. As with all OptimisticTextInputs if an error is thrown in the onChange or onBlur, it'll show a default error state (right now that's a little firetruck). To test that out use the button below and then type.</p>
    <PropsDefinition>
      <Prop name="initialName">
        The project domain as it is currently saved in state
      </Prop>
      <Prop name="onChange">
        A callback function, which is called with the input's new value on change events. Should be used to persist changes everytime the user types (also potentially updating the url in the browser so as to more gracefully handle refreshes)
      </Prop>
      <Prop name="onBlur">
        A callback function, which is called with the user navigates away from the input. Should be used to update state throughout the page globally (no need to cause global rerenders until we're ready)
      </Prop>
      <CodeExample>
      {
`<EditableProjectDomain 
  initialName="a-great-project-name" 
  onChange={() => console.log("saved to the backend")} 
  onBlur={(() => console.log("we're done here, update everywhere"))}
/>`
      }
    </CodeExample>
      <div style={{ marginBottom: "10px" }}>
        <EditableProjectDomain 
          initialName="a-great-project-name" 
          onChange={() => {
            setMockError(false);
            if (mockError) {
              const fakeError = new Error()
              fakeError.response = {
                data: {
                  message: "That name is already taken, please try a different one"
                }
              }
              throw fakeError
            }
            console.log("saved to the backend")
          }} 
          onBlur={(() => console.log("we're done here, update everywhere"))}
        />
      </div>
      <Button onClick={() => setMockError(true)}>Click to trigger a fake error next time the user types</Button>
    </PropsDefinition>
  </>
)};