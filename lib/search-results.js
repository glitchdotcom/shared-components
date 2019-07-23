import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResultsList } from './results-list'
import { TextInput } from './text-input'


const SearchResults = ({ value, options, onChange, children, ...props }) => {
  const [shouldShowResults, setShouldShowResults] = React.useState(false);
  const inputRef = React.useRef();
  const [focused, setFocused] = React.useState(null);
  // when focused is null, hide the resul
  React.useEffect(() => {
    if (focused === null) {
      inputRef.current.focus();
    }
  }, [focused]);
  
  // focus input when options change
  React.useEffect(() => {
    setFocused(null);
  }, [options]);

  // hide results on escape
  const hideResultsOnEscape = (e) => {
    if (e.key === 'Escape') {
      setFocused(null)  
    }
  }
  const showRe
  
  return (
    <>
      <TextInput type="search" variant="opaque" value={value} onChange={onChange} onFocus={showResults} {...props} />
      {showResults && (
        <ResultsList options={options} onKeyDown={handleEsc}>
          {children}
        </ResultsList>
      )}
    </>
  )
  
}