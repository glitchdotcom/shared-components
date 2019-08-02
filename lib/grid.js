import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

const GridContainer = styled.ul`
  display: grid;
  grid-gap: var(--gap, var(--space-1));
  grid-template-columns: repeat(auto-fit, minmax(var(--min-width, 18rem), 1fr));
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const GridItem = styled.li`
  max-width: 100%;
`

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
      <GridItem key={item.id} {...itemProps}>
        {children(item)}
      </GridItem>
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


const items = ["spotify","spotify-web-playback","spotify-audio-features","spotify-playground","spotify-oauth","spotify-token-swap"].map(id => ({ id }))

const Block = styled.div`
  padding: var(--space-1);
  border-radius: var(--rounded);
  color: var(--colors-tertiary-text);
  background-color: var(--colors-tertiary-background);
`

const GridWithItemsContainer = styled.div`
  margin: var(--space-1) 0;
  padding: var(--space-1);
  background-color: var(--colors-secondaryBackground);
`

const GridWithItems = (props) => (
  <GridWithItemsContainer {...props}>
    <Grid items={items} minWidth="230px">
      {(item) => <Block>{item.id}</Block>}
    </Grid>
  </GridWithItemsContainer>
)

export const StoryGrid = () => (
  <>
    <p>
      The Grid component renders an array of items as a responsive grid.
      Instead of having a fixed number of columns, the grid will render as many columns per row as it can while keeping their width above "minWidth".
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
        The minimum width of a column. Defaults to 18rem.
      </Prop>
      <Prop name="itemProps">
        Additional props to apply to the <code>{`<li>`}</code> element that wraps each item.
      </Prop>
    </PropsDefinition>
    <p>
      Grids adjust to fit their container, not the viewport. Here's the same grid with a minWidth of 230px in different containers:
    </p>
    <GridWithItems />
    <h3>1000px</h3>
    <GridWithItems style={{ maxWidth: '1000px'}} />
    <h3>800px</h3>
    <GridWithItems style={{ maxWidth: '800px'}} />
    <h3>600px</h3>
    <GridWithItems style={{ maxWidth: '600px'}} />
    <h3>400px</h3>
    <GridWithItems style={{ maxWidth: '400px'}} />
    <h3>200px</h3>
    <GridWithItems style={{ maxWidth: '200px'}} />
  </>
)
