import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GridContainer = styled.ul`
  display: grid;
  grid-row-gap: var(--row-gap, 0.5rem);
  grid-column-gap: var(--column-gap, 0.5rem);
  grid-template-columns: repeat(auto-fill, minmax(var(--min-width, 18rem), 1fr));
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const GridItem = styled.li``;

export const Grid = ({ items, children, itemProps, gap, minWidth, props }) => (
  <GridContainer
    style={{
      '--row-gap': (gap && gap.row) || gap,
      '--column-gap': (gap && gap.column) || gap,
      '--min-width': minWidth,
    }}
  >
    {items.map((item) => (
      <GridItem key={item.id} {...itemProps}>
        {children(item)}
      </GridItem>
    ))}
  </GridContainer>
);

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.node.isRequired })).isRequired,
  children: PropTypes.func.isRequired,
  itemProps: PropTypes.object,
  gap: PropTypes.oneOfType([
    PropTypes.shape({ row: PropTypes.node.isRequired, column: PropTypes.node.isRequired }).isRequired,
    PropTypes.node.isRequired,
  ]),
  minWidth: PropTypes.node,
};
