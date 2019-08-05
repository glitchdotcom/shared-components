import React from 'react';
import styled from 'styled-components';
import { LocalStyle } from './system';
import * as themes from './themes';

const Grid = styled.div`
  display: grid;
  grid-gap: var(--space-1);
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
`;

const createCells = (theme) => {
  const textCells = ['primary', 'secondary', 'placeholder', 'border'].map((fg) => ({
    id: fg,
    value: theme.colors[fg],
    style: { color: theme.colors[fg] },
  }));
  const backgroundCells = ['tertiary', 'private', 'error', 'warning', 'notice', 'success', 'selected'].map((bg) => ({
    id: bg,
    value: theme.colors[bg].background,
    style: { color: theme.colors[bg].text, backgroundColor: theme.colors[bg].background },
  }));
  return [...textCells, ...backgroundCells];
};

const Text = styled.p`
  font-size: var(--text-small);
  margin: 0;
  & + & {
    margin-top: var(--space-1);
  }
`;

const ThemePreview = ({ theme }) => (
  <LocalStyle theme={theme}>
    {['background', 'secondaryBackground'].map((bg) => (
      <div key={bg} style={{ backgroundColor: theme.colors[bg], padding: 'var(--space-1)' }}>
        <h3>
          {bg}
          <span style={{ fontWeight: 'normal', color: 'var(--colors-secondary)', marginLeft: 'var(--space-1)' }}>{theme.colors[bg]}</span>
        </h3>
        <Grid>
          {createCells(theme).map(({ id, variant, value, style }) => (
            <div key={id} style={{ ...style, textAlign: 'center', padding: 'var(--space-1)', borderRadius: 'var(--rounded)' }}>
              <Text>{id}</Text>
              <Text>{value}</Text>
            </div>
          ))}
        </Grid>
      </div>
    ))}
  </LocalStyle>
);

const ThemeGrid = styled.div`
  display: grid;
  grid-gap: var(--space-1);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;
export const StoryThemes = () => (
  <>
    <p>This library includes a collection of themes that can be used with the RootStyle or LocalStyle components.</p>
    <p><strong>TODO</strong>: document the required fields for themes</p>
    <ThemeGrid>
      {Object.entries(themes).map(([id, theme]) => (
        <div key={id}>
          <h2>{id}</h2>
          <ThemePreview theme={theme} />
        </div>
      ))}
    </ThemeGrid>
  </>
);
