import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// http://www.heydonworks.com/article/the-flexbox-holy-albatross-reincarnated
const RowContainer = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  --gap: 1rem;
  --min-width: 18rem;
  --modifier: calc((var(--min-width) * var(--item-count)) + (var(--gap) * (var(--item-count) - 1)) - 100%);
  margin: calc(var(--gap) * -0.5);
`;

const ItemBase = styled.li`
  flex-grow: 1;
  flex-basis: calc(var(--modifier) * 999);
`;

const Filler = styled(ItemBase)``;

const RowItem = styled(ItemBase)`
  flex-shrink: 0;
  margin: calc(var(--gap) * 0.5);
  min-width: calc(var(--min-width) - var(--gap));
  max-width: calc(100% - var(--gap));
`;

export const Row = ({ items, children, count, gap, minWidth, itemProps, ...props }) => (
  <RowContainer
    style={{
      '--item-count': count,
      '--gap': gap,
      '--min-width': minWidth,
    }}
    {...props}
  >
    {items.slice(0, count).map((item, index) => (
      <RowItem key={item.id}>{children(item, index)}</RowItem>
    ))}
    {count > items.length &&
      Array(count - items.length)
        .fill()
        .map((i) => <Filler key={`filler-${i}`} />)}
  </RowContainer>
);

Row.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.node.isRequired })).isRequired,
  children: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  itemProps: PropTypes.object,
  gap: PropTypes.node,
  minWidth: PropTypes.node,
};
