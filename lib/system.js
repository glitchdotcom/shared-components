import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { CodeExample, PropsDefinition, Prop } from './story-utils';

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
  font-size: 100%;
  color: var(--colors-primary);
  --local-colors-secondary: var(--colors-secondary);
  background-color: var(--colors-background);
`;

const sizeNames = ['tiny', 'small', 'normal', 'big', 'bigger', 'huge'];
export const sizes = {};
for (const size of sizeNames) {
  sizes[size] = `font-size: var(--fontSizes-${size});`;
}

export const Story_RootStyle_and_LocalStyle = () => (
  <>
    <p>
      RootStyle applies a theme to the page's <code>:root</code> element. It can be rendered anywhere in the app and does not need to wrap other
      elements; as long as it is mounted, the theme will be applied.
    </p>
    <CodeExample>{`<RootStyle theme={lightTheme} />`}</CodeExample>
    <p>LocalStyle applies a theme to its children only.</p>
    <CodeExample>{`<LocalStyle theme={darkTheme}>This content is dark themed</LocalStyle>`}</CodeExample>
    <PropsDefinition>
      <Prop name="theme">
        The theme to use. This can be provided either directly as a prop, or using Styled Components' <code>ThemeProvider</code>.
      </Prop>
    </PropsDefinition>
  </>
);
