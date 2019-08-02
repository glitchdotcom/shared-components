import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

const GridContainer = styled.ul`
  display: grid;
  grid-row-gap: var(--gap, var(--space-1));
  grid-column-gap: var(--gap, var(--space-1));
  grid-template-columns: repeat(auto-fill, minmax(var(--min-width, 18rem), 1fr));
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const Grid = ({ items, children, itemProps, gap, minWidth, ...props }) => (
  <GridContainer
    data-module="Grid"
    style={{
      '--gap': gap,
      '--min-width': minWidth,
    }}
    {...props}
  >
    {items.map((item) => (
      <li key={item.id} {...itemProps}>
        {children(item)}
      </li>
    ))}
  </GridContainer>
);

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.node.isRequired })).isRequired,
  children: PropTypes.func.isRequired,
  gap: PropTypes.node,
  minWidth: PropTypes.node,
  itemProps: PropTypes.object,
};

const Block = styled.div`
  padding: var(--space-1);
  border-radius: var(--rounded);
  color: var(--colors-tertiary-text);
  background-color: var(--colors-tertiary-background);
`

export const StoryGrid = () => (
  <>
    <p>
      The Grid component renders an array of items as a responsive grid.
      Instead of having a fixed number of columns, the grid will render as many columns as it can
    </p>
    <CodeExample>
      {code`
        <Grid minWidth="350px" items={projects}>
          {(project) => <Project project={project} />}
        <Grid>
      `}
    </CodeExample>
    <PropsDefinition>
      <Prop name="items" required>
        An array of items to render. Each item should have an "id" property.
      </Prop>
      <Prop name="children" required>
        A render prop, which passes in the item to render.
      </Prop>
      <Prop name="gap">
        The width of the gap between items. Defaults to --space-1.
      </Prop>
      <Prop name="minWidth">
      
      </Prop>
    </PropsDefinition>
  </>
)
