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

export const ResultsList = React.forwardRef(({ scroll, options, ...props }, ref) => {
  const refs = React.useRef([]);
  return (
    <ScrollContainer data-module="ResultsList" scroll={scroll} {...props}>
      <ResultsListContainer>
        {options.map((item, i) => (
          <ResultsListItemWrap key={item.id}>
            {item.render ? item.render}
          </ResultsListItemWrap>
        ))}
      </ResultsListContainer>
    </ScrollContainer>
  )
});