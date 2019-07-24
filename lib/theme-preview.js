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
  background-color: var(--colors-background);
`

export const ThemePreview = ({ theme }) => (
  <ThemeContainer theme={theme}>
    {['background', 'secondaryBackground', 'tertiaryBackground'].map(bg => (
      <Box key={bg} style={{ backgroundColor: theme.colors[bg] }} padding={1}>
        <H as="h3" mb={1}>
          {bg}
          <Box as="span" ml={1} style={{ fontWeight: 'normal', color: 'var(--colors-secondary)' }}>{theme.colors[bg]}</Box>
        </H>      
        <Grid items={['private', 'cta', 'error', 'warning', 'info', 'success', 'selected'].map(id => ({ id }))} minWidth="4rem">
          {({ id }) => (
            <Box
              style={{ color: theme.colors[id].text, backgroundColor: theme.colors[id].background, textAlign: 'center' }} 
              padding={1} 
              rounded>
              <P size="small">{id}</P>
              <P size="tiny">{theme.colors[id].background}</P>
            </Box>
          )}
        </Grid>
      </Box>
    ))}
  </ThemeContainer>
)

const themeItems = Object.entries(themes).map(([id, theme]) => ({ id, theme }))

export const StoryThemePreview = () => (
  <Grid items={themeItems}>
    {({ id, theme }) => (
      <Box>
        <H as="h2" mb={1}>{id}</H>
        <ThemePreview theme={theme} />
      </Box>
    )}
  </Grid>
)
