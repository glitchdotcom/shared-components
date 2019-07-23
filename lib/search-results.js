import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResultsList } from './results-list'
import { TextInput } from './text-input'


const SearchResults = ({ value, options, onChange, children, ...props }) => {
  const [shouldShowResults, setShouldShowResults] = React.useState(false);
  const inputRef = React.useRef();
  const [focused, setFocused] = React.useState(null);
  
  // focus input when options change
  React.useEffect(() => {
    setFocused(null);
    inputRef.current.focus();
  }, [options]);
  
  // show results when value changes
  React.useEffect(() => {
    if (value.length) {
      setShouldShowResults(true)
    }
  }, [value])
  
  const showResults = () => {
    setShouldShowResults(true)
  }

  const hideResultsOnEscape = (e) => {
    if (e.key === 'Escape') {
      setShouldShowResults(false)
    }
  }
  
  const handleFormKeys = (e) => {
    hideResultsOnEscape(e)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocused()  
    }
  }
  
  return (
    <span data-module="SearchResults">
      <TextInput
        type="search" 
        variant="opaque" 
        value={value} 
        onChange={onChange} 
        onFocus={showResults} 
        onKeyDown={handleFormKeys} {...props} 
      />
      {shouldShowResults && (
        <ResultsList options={options} onKeyDown={hideResultsOnEscape}>
          {children}
        </ResultsList>
      )}
    </span>
  )
  
}