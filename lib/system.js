import React from './react';
import styled, { createGlobalStyle } from 'styled-components';
import * as themes from './themes';

function* themeToCSSVars(theme, prefix = '--') {
  for (const [key, value] of Object.entries(theme)) {
    if (typeof value === 'string') {
      yield `${prefix}${key}: ${value};`;
    } else {
      yield* themeToCSSVars(value, `${prefix}${key}-`);
    }
  }
}

const setThemeVars = ({ theme }) => {
  return [...themeToCSSVars(theme)].join('\n');
};

export const RootStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    position: static;
  }
  :root {
    ${setThemeVars}
    font-family: var(--fonts-sans);
    font-size: 100%;
    color: var(--colors-primary);
    --local-colors-secondary: var(--colors-secondary);
    background-color: var(--colors-background);
  }
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
`;

export const LocalStyle = styled.div`
  ${setThemeVars};
  font-family: var(--fonts-sans);
  font-size: 100%;
  color: var(--colors-primary);
  --local-colors-secondary: var(--colors-secondary);
  background-color: var(--colors-background);
`

const sizeNames = ['tiny', 'small', 'normal', 'big', 'bigger', 'huge'];
export const sizes = {};
for (const size of sizeNames) {
  sizes[size] = `font-size: var(--fontSizes-${size});`;
}

const themeOptions = Object.entries(themes).map(([name, theme]) => ({ id: name, label: name }));

export const Story_style_providers = () => {
  
}

const  = () => {
  const [value, onChange] = React.useState(themeOptions[0].id);
  
  return (
    <>
      <SectionH>Themes</SectionH>
      <p>
        This library includes a set of themes 
      </p>
      <RootStyle theme={themes[value]} />
      <Select value={value} onChange={(val) => onChange(val)} options={themeOptions} />
      <StoryThemePreview />
    </>
  )
}

expo