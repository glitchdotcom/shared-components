import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './box';
import { H, P } from './text';
import { Grid } from './grid';
import { setThemeVars } from './system';
import * as themes from './theme';

const ThemeContainer = styled(Box)`
  ${setThemeVars}
  font-family: var(--fonts-sans);
  font-size: 100%;
  color: var(--colors-primary);
  --local-colors-secondary: var(--colors-secondary);
  background-color: var(--colors-background);
`

const createCells = (theme) => {
  const textCells = ['primary', 'secondary', 'placeholder', 'border']
    .map(fg => ({
      id: fg,
      value: theme.colors[fg],
      style: { color: theme.colors[fg] },
    }))
  const backgroundCells = ['tertiary', 'private', 'cta', 'error', 'warning', 'info', 'success', 'selected']
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
      <Box key={bg} style={{ backgroundColor: theme.colors[bg] }} padding={1}>
        <H as="h3" mb={1}>
          {bg}
          <Box as="span" ml={1} style={{ fontWeight: 'normal', color: 'var(--colors-secondary)' }}>{theme.colors[bg]}</Box>
        </H>
        <Grid items={createCells(theme)} minWidth="5rem">
          {({ id, variant, value, style }) => (
            <Box
              variant={variant}
              style={{ textAlign: 'center' }} 
              padding={1} 
              rounded>
              <P size="small" style={style}>{id}</P>
              <P size="tiny" variant="secondary">{value}</P>
            </Box>
          )}
        </Grid>
      </Box>
    ))}
  </ThemeContainer>
)

const themeItems = Object.entries(themes).map(([id, theme]) => ({ id, theme }))

export const StoryThemePreview = () => (
  <Grid items={themeItems} minWidth="300px">
    {({ id, theme }) => (
      <Box>
        <H as="h2" mb={1}>{id}</H>
        <ThemePreview theme={theme} />
      </Box>
    )}
  </Grid>
)
