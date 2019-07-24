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
`

export const ThemePreview = ({ theme }) => (
  <ThemeContainer padding={1} theme={theme}>
    {['background', 'secondaryBackground', 'tertiaryBackground'].map(color => (
      <Box key={color} style={{ backgroundColor: `var(--colors-${color})` }} padding={1}>
        <H as="h3">{color}</H>      
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
