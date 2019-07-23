import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResultsList, ResultItem, ResultInfo, ResultName, ResultDescription } from './results-list'
import { TextInput } from './text-input'


const reducers = {
  valueChanged: (state, value) => value.length ? ({ ...state, shouldShowResults: true }) : state,
  optionsChanged: (state, options) => ({ ...state, options, focused: null }),
  focusedChanged: (state, focused) => ({ ...state, focused }),
  resultsHidden: (state) => ({ ...state, shouldShowResults: false, focused: null }),
  firstOptionSelected: (state) => state.options.length > 0 ? ({ ...state, focused: state.options[0].id }) : state,
  inputFocused: (state) => 
}

const SearchResults = ({ value, options, onChange, children, ...props }) => {
  const [{ shouldShowResults, focused }, dispatch] = useReducerMap(reducers, {
    value,
    options,
    shouldShowResults: false,
    focused: null,
  })
  
  const [shouldShowResults, setShouldShowResults] = React.useState(false);
  const [focused, setFocused] = React.useState(null);
  
  React.useEffect(() => dispatch('valueChanged', value), [value])
  React.useEffect(() => dispatch('optionsChanged', options), [options])
  
  const hideResultsOnEscape = (e) => {
    if (e.key === 'Escape') dispatch('resultsHidden')
  }
  
  const focusResultsOnArrowDown = (e) => {
    if (e.key === 'ArrowDown') dispatch()
  }
   
  const handleFormKeys = (e) => {
    hideResultsOnEscape(e)
    focusResultsOnArrowDown(e)
  }
  
  const hideIfButtonNotFocused = () => {
    if (focused === null) {
      setShouldShowResults(false)
    }
  }
  
  const onFocusTextInput = (e) => {
    setShouldShowResults(true)
    setFocused(null)
  }
  
  console.log({ value, focused })
  
  return (
    <span data-module="SearchResults">
      <TextInput
        type="search" 
        variant="opaque"
        value={value} 
        onChange={onChange} 
        onFocus={onFocusTextInput}
        onBlur={hideIfButtonNotFocused}
        onKeyDown={handleFormKeys} {...props} 
      />
      {shouldShowResults && (
        <ResultsList options={options} value={focused} onChange={(id) => setFocused(id)} onKeyDown={hideResultsOnEscape}>
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
    <SearchResults 
      label="project name" 
      placeholder="search for projects" 
      value={query} 
      onChange={(q) => setQuery(q)} 
      options={filteredOptions}
    >
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