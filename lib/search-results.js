import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResultsList, ResultItem, ResultInfo, ResultName, ResultDescription } from './results-list'
import { TextInput } from './text-input'


const SearchResults = ({ value, options, onChange, children, ...props }) => {
  const [shouldShowResults, setShouldShowResults] = React.useState(false);
  const inputRef = React.useRef();
  const [focused, setFocused] = React.useState(null);
  
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
  const hideIfButtonNotFocused = () => {
    if (focused === null) {
      setShouldShowResults(false)
    }
  }
  
  console.log({ value, focused })
  
  return (
    <span data-module="SearchResults">
      <TextInput
        type="search" 
        variant="opaque" 
        ref={inputRef}
        value={value} 
        onChange={onChange} 
        onFocus={() => setShouldShowResults(true)}
        onBlur={hideIfButtonNotFocused}
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

const hash = (opts) => opts.map(opt => opt.id).join(',')

const resultOptions = [
  { id: 1, domain: 'power-passenger', description: 'take 2 on glitch component library' },
  { id: 2, domain: 'fan-coal', description: 'The Glitch community site' },
]

export const StorySearchResults = () => {
  const [query, setQuery] = React.useState("")
  const [filteredOptions, setFilteredOptions] = React.useState(resultOptions)
  React.useEffect(() => {
    const nextOptions = resultOptions.filter((opt) => opt.domain.includes(query.trim()))
    setFilteredOptions((prevOptions) => hash(prevOptions) === hash(nextOptions) ? prevOptions : nextOptions)
  }, [query])
  
  return (
    <SearchResults label="project name" placeholder="search for projects" value={query} onChange={(q) => setQuery(q)} options={filteredOptions}>
      {({ item, ...props }) => (
        <ResultItem  as="a" href={`https://glitch.com/~${item.domain}`} {...props}>
          <ResultInfo>
            <ResultName>{item.domain}</ResultName>
            {item.description && <ResultDescription>{item.description}</ResultDescription>}
          </ResultInfo>
        </ResultItem>
      )}
    </SearchResults>
  )
}