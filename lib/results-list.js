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

const ResultItem = styled.span`
  color: primary
  background-color: primary-background
  position: relative
  padding: 12px 6px
  ${({ active }) => active && styled.css`

`}
`


export const ResultsList = React.forwardRef(({ scroll, value, options, onChange, onKeyDown, children, ...props }, ref) => {
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
        {options.map((item, i) => (
          <ResultsListItemWrap key={item.id}>
            {children({
              ...item,
              ref: (el) => {
                refs.current[i] = el;
              },
              active: value === item.id,
              tabIndex: value === item.id ? 0 : -1,
              onKeyDown: handleKeyDown(i),
            })}
          </ResultsListItemWrap>
        ))}
      </ResultsListContainer>
    </ScrollContainer>
  )
});