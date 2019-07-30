import styled from 'styled-components';

function* themeToCSSVars(theme, prefix = '--') {
  for (const [key, value] of Object.entries(theme)) {
    if (typeof value === 'string') {
      yield `${prefix}${key}: ${value};`;
    } else {
      yield* themeToCSSVars(value, `${prefix}${key}-`);
    }
  }
}

export const setThemeVars = ({ theme }) => {
  return [...themeToCSSVars(theme)].join('\n');
};

export const RootStyle = styled.createGlobalStyle`
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

const sizeNames = ['tiny', 'small', 'normal', 'big', 'bigger', 'huge'];
export const sizes = {};
for (const size of sizeNames) {
  sizes[size] = `font-size: var(--fontSizes-${size});`;
}

const variantNames = ['tertiary', 'private', 'error', 'warning', 'notice', 'success', 'selected'];

export const variantColors = {
  default: styled.css`
    color: var(--colors-primary);
    --local-colors-secondary: var(--colors-secondary);
    background-color: var(--colors-background);
  `,
  secondary: styled.css`
    color: var(--colors-primary);
    --local-colors-secondary: var(--colors-secondary);
    background-color: var(--colors-secondaryBackground);
  `,
  inverted: styled.css`
    color: var(--colors-background);
    --local-colors-secondary: var(--colors-secondaryBackground);
    background-color: var(--colors-primary);
  `,
};

// NOTE: prettier mangles these CSS variables: https://github.com/prettier/prettier/issues/6259#issuecomment-513931664
// be on the lookout for other bugs in styled blocks
for (const name of variantNames) {
  // prettier-ignore
  variantColors[name] = styled.css`
    color: var(--colors-${name}-text);
    --local-colors-secondary: var(--colors-${name}-secondary);
    background-color: var(--colors-${name}-background);
  `;
}
