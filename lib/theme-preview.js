import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from './box';
import { H, P } from './text';
import { setThemeVars } from './system';

const ThemeContainer = styled(Box)`
  ${setThemeVars}
`

export const ThemePreview = styled.withTheme(({ theme }) => (
  <ThemeContainer padding={1}>
    {['background', 'secondaryBackground', 'tertiaryBackground'].map(color => (
      <Box style={{ backgroundColor: theme.colors[color] }} padding={1}>
        <H as="h2">{color}</H>      
      </Box>
    ))}
  </ThemeContainer>
))

export StoryThemePreview = () => (
  <>
    {themes.map(theme) => ()}
  </>
)
