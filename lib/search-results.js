import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResultsList, ResultItem, ResultInfo, ResultName, ResultDescription } from './results-list'
import { TextInput } from './text-input'

const reducers = {
  optionsChanged: (state, options) => ({ ...state, options, focused: null }),
  focusedChanged: (state, focused) => ({ ...state, focused }),
  firstOptionFocused: (state) => state.options.length > 0 ? ({ ...state, focused: state.options[0].id }) : state,
  inputFocused: (state) => ({ ...state, focused: null }),
}

const useReducerMap = (reducerMap, initState) => {
  const reducer = React.useMemo(() => (state, action) => reducerMap[action.type](state, action.payload), [reducerMap])
  const [currentState, baseDispatch] = React.useReducer(reducer, initState)
  const dispatch = (type, payload) => baseDispatch({ type, payload })
  return [currentState, dispatch]
}

const FloatingResultsList = styled(ResultsList)`
  position: absolute;
  width: 100%;
  z-index: 1;
  background-color: var(--colors-background);
  display: none;
`

const Container = styled.span`
  display: block;
  position: relative;
  &:focus-within ${FloatingResultsList} {
    display: block;
  }
`

export const SearchResults = ({ value, options, onChange, onKeyDown, children, ...props }) => {
  const [{ focused }, dispatch] = useReducerMap(reducers, null)
    
  return (
    <Container data-module="SearchResults">
      <TextInput
        type="search" 
        variant="opaque"
        value={value} 
        onChange={onChange} 
        onFocus={() => dispatch('inputFocused')}
        onKeyDown={(e) => {
          if (e.key === 'Escape') e.target.blur()
          if (e.key === 'ArrowDown') dispatch('firstOptionFocused', options)
          onKeyDown(e)
        }} 
        {...props} 
      />
      <FloatingResultsList 
        value={focused} 
        onChange={(id) => dispatch('focusedChanged', id)} 
        options={options}
        onKeyDown={(e) => {
          if (e.key === 'Escape') e.target.blur()
        }}
      >
        {children}
      </FloatingResultsList>
    </Container>
  )
}
SearchResults.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
}
SearchResults.defaultProps = {
  onKeyDown: () => {},
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
  
  const searchForQuery = (e) => {
    e.preventDefault()
    window.location = `https://glitch.com/search?q=${query}`
  }
    
  return (
    <form onSubmit={searchForQuery}>
      <SearchResults 
        label="project name" 
        placeholder="search for projects" 
        value={query} 
        onChange={(q) => setQuery(q)} 
        options={filteredOptions}
      >
        {({ item, ...props }) => (
          <ResultItem as="a" href={`https://glitch.com/~${item.domain}`} {...props}>
            <ResultInfo>
              <ResultName>{item.domain}</ResultName>
              {item.description && <ResultDescription>{item.description}</ResultDescription>}
            </ResultInfo>
          </ResultItem>
        )}
      </SearchResults>
    </form>
  )
}