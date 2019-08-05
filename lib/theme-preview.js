import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { setThemeVars } from './system';
import * as themes from './theme';

const ThemeContainer = styled.div`
  ${setThemeVars}
  font-family: var(--fonts-sans);
  font-size: 100%;
  color: var(--colors-primary);
  --local-colors-secondary: var(--colors-secondary);
  background-color: var(--colors-background);
`

const Grid = styled.div`
  display: grid;
  grid-gap: var(--space-1);
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
`

const createCells = (theme) => {
  const textCells = ['primary', 'secondary', 'placeholder', 'border']
    .map(fg => ({
      id: fg,
      value: theme.colors[fg],
      style: { color: theme.colors[fg] },
    }))
  const backgroundCells = ['tertiary', 'private', 'cta', 'error', 'warning', 'notice', 'success', 'selected']
    .map(bg => ({
      id: bg,
      variant: bg,
      value: theme.colors[bg].background,
      style: { },
    }))
  return [...textCells, ...backgroundCells]
}

export const ThemePreview = ({ theme }) => (
  <ThemeContainer theme={theme}>
    {['background', 'secondaryBackground'].map(bg => (
      <div key={bg} style={{ backgroundColor: theme.colors[bg], padding: 'var(--space-1)' }}>
        <h3>
          {bg}
          <span style={{ fontWeight: 'normal', color: 'var(--colors-secondary)', marginLeft: 'var(--space-1)' }}>{theme.colors[bg]}</span>
        </h3>
        <Grid>
          {createCells(theme).map(({ id, variant, value, style }) => (
            <div
              variant={variant}
              style={{ textAlign: 'center', padding: 'var(--space-1)', borderRadius: 'var(--rounded)' }} 
            >
              <p size="small" style={style}>{id}</p>
              <p size="tiny" variant="secondary">{value}</p>
            </div>
          ))}
        </Grid>
      </div>
    ))}
  </ThemeContainer>
)

const themeItems = Object.entries(themes).map(([id, theme]) => ({ id, theme }))

const ThemeGrid = 

export const StoryThemePreview = () => (
  <ThemeGrid>
    {themeItems.map(({ id, theme }) => (
      <Box>
        <H as="h2" mb={1}>{id}</H>
        <ThemePreview theme={theme} />
      </Box>
    ))}
  </ThemeGrid>
)

