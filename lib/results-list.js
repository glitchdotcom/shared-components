import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { onArrowKeys } from './keyboard-navigation';

const ScrollContainer = styled.div`
  ${({ scroll }) => scroll && styled.css`
    overflow-y: scroll;
    max-height: 14rem;
  `}
`

const ResultsListContainer = styled.ul`
  margin: 0;
  padding: var(--space-1);
  list-style-type: none;
`

const ResultsListItemWrap = styled.li`
  & + & {
    border-top: 1px solid var(--colors-border);
  }
`

export const ResultsList = React.forwardRef(({ scroll, value, options, onChange, onKeyDown, ...props }, ref) => {
  const refs = React.useRef([]);
  
  const handleKeyDown = (index) => (e) => {
    onKeyDown(e); // propagate other events, e.g. Esc key
    const nextIndex = onArrowKeys(e, index, options);
    if (nextIndex === null) return;
    onChange(options[nextIndex].id, e);
    refs.current[nextIndex].focus();
  }
  
  return (
    <ScrollContainer data-module="ResultsList" scroll={scroll} {...props}>
      <ResultsListContainer>
        {options.map(({ id, component: Component }, i) => (
          <ResultsListItemWrap key={id}>
            <Component 
              ref={(el) => {
                refs.current[i] = el;
              }}
              active={value === id}
              tabIndex={value === id ? 0 : -1}
              onKeyDown={handleKeyDown(i)}
            />
          </ResultsListItemWrap>
        ))}
      </ResultsListContainer>
    </ScrollContainer>
  )
});