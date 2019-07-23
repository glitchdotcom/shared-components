import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


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

const ResultItem = styled.li`

`

export const ResultsList = ({ scroll, items, children }) => (
  <ScrollContainer data-module="ResultsList" scroll={scroll} {...props}>
    <ResultsListContainer>
      {items.map((item, i) => (
        <li key={item.id} className={classnames(styles.resultItemWrap)}>
          {children(item, i)}
        </li>
      ))}
    </ul>
  </div>
);

