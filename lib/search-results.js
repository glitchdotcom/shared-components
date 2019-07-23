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
  
  const hideResultsOnEscape = (e) => {
    if (e.key === 'Escape') {
      setShouldShowResults(false)
    }
  }
  
  const handleFormKeys = (e) => {
    hideResultsOnEscape(e)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocused(options[0].id)  
    }
  }
  
  return (
    <span data-module="SearchResults">
      <TextInput
        type="search" 
        variant="opaque" 
        value={value} 
        onChange={onChange} 
        onFocus={() => setShouldShowResults(true)} 
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

const StorySearchResults = () => {
  const [query, setQuery] = React.useState("")
  const options = React.useMemo(() => { 
    const resultOptions = [
      { id: 1, domain: 'power-passenger', description: 'take 2 on glitch component library' },
      { id: 2, domain: 'fan-coal', description: 'The Glitch community site' },
    ]
    return resultOptions.filter((opt) => opt.domain.includes(query.trim()))

  })
}