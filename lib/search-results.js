import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResultsList } from './results-list'
import { TextInput } from './text-input'


const SearchResults = () => {
  const [query, setQuery] = 
  
  const inputRef = React.useRef();
  const [value, setValue] = React.useState(null);
  // reset value & focus when items change
  React.useEffect(() => {
    setValue(null);
    inputRef.current.focus();
  }, [items]);

  // focus input when there's no active index
  React.useEffect(() => {
    if (value === null) {
      inputRef.current.focus();
    }
  }, [value]); 
  
  
  return (
    <TextInput
          ref={inputRef}
          autoFocus
          labelText={labelText}
          value={value}
          onChange={onChange}
          opaque
          placeholder={placeholder}
          type="search"
        />
  
  )
  
}