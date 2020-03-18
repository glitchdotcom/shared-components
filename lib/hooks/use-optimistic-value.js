import React from 'react';

import useDebouncedValue from './use-debounced-value';

/*

Use Optimistic Value:

- takes in an initial value for the input (this representes the real value the server last gave us)
- takes in a way to update the server

on change:
- we show them what they are typing (or editing in case of checkbox, etc), and OPTIMISTICALLY assume it all went according to plan
- if the server hits an error:
  - we display that error to the user
  - and we continue to show what the user's input even though it's not saved
- if the server succeeds:
  - we pass along the response so that it can be stored in top level state later and passed back in again as props as the initial "real" value

on blur:
- if the user was in an errored state:
  - we show the last saved good state and remove the error

*/

export default function useOptimisticValue(realValue, onChange, onBlur) {
  // value undefined means that the field is unchanged from the 'real' value
  const [state, setState] = React.useState({ value: undefined, error: null });

  // as the user types we save that as state.value, later as the user saves, we reset the state.value to undefined and instead show whatever value is passed in
  const optimisticOnChange = (newValue) => setState({ value: newValue, error: null });

  // always show what the server knows, unless the user is currently typing something or we're loading an in-flight request
  let optimisticValue = realValue;
  if (state.value !== undefined) {
    optimisticValue = state.value;
  }

  const debouncedValue = useDebouncedValue(state.value, 500);

  React.useEffect(() => {
    const ifUserHasTypedSinceLastSave = debouncedValue !== undefined;

    if (ifUserHasTypedSinceLastSave) {
      // if the value changes during the async action then ignore the result
      const setStateIfStillRelevant = (newState) => setState((prevState) => (prevState.value === debouncedValue ? newState : prevState));

      // this scope can't be async/await because it's an effect
      onChange(debouncedValue).then(
        () => {
          setStateIfStillRelevant({ value: undefined, error: null });
        },
        (error) => {
          const message =
            (error && error.response && error.response.data && error.response.data.message) || 'Sorry, we had trouble saving. Try again later?';
          setStateIfStillRelevant({ value: debouncedValue, error: message });
        },
      );
    }
  }, [debouncedValue]);

  const optimisticOnBlur = (event) => {
    // if you have already shown the user an error you can go ahead and hide it and revert back to last saved value
    if (state.error) {
      setState({ error: null, value: undefined });
    }
    if (onBlur) {
      onBlur(event);
    }
  };

  return [optimisticValue, optimisticOnChange, optimisticOnBlur, state.error];
}
