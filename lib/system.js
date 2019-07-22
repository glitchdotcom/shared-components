import styled from 'styled-components';
import PropTypes from 'prop-types';

function* themeToCSSVars(theme, prefix = '--') {
  for (const [key, value] of Object.entries(theme)) {
    if (typeof value === 'string') {
      yield `${prefix}${key}: ${value};`;
    } else {
      yield* themeToCSSVars(value, `${prefix}${key}-`);
    }
  }
}

const setRootVars = ({ theme }) => {
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
    ${setRootVars}
    font-family: var(--fonts-sans);
    font-size: 100%;
    color: var(--colors-primary);
    background-color: var(--colors-background);
  }
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
`;

// TODO: should _all_ of these variants be available wherever _any_ variant is?
const variantNames = ['private', 'cta', 'error', 'warning', 'info', 'success', 'selected']
      
export const variantColors = {
  default: styled.css`
    color: var(--colors-primary);
    background-color: var(--colors-background);
  `,
  highlight: styled.css`
    color: var(--colors-primary);
    background-color: var(--colors-secondaryBackground);
  `,
  inverted: styled.css`
    color: var(--colors-background);
    background-color: var(--colors-primary);
  `,
}
for (const name of variantNames) {
  variantColors[name] = styled.css`
    color: var(--colors-${name}-text);
    background-color: var(--colors-${name}-background);
  `
}

const sizeNames = ['tiny', 'small', 'normal', 'big', 'bigger', 'huge']
export const sizes = {}
for (const size of sizeNames) {
  sizes[size] = styled.css`
    font-size: var(--fontSizes-${size});
  `
}

export const getSpace = (keys, defaultValue) => (props) => {
  for (const key of keys) {
    if (key in props) return `var(--space-${props[key]})`
  }
  return defaultValue
}

export const margin = styled.css`
  margin-top: ${getSpace(['marginTop', 'mt', 'marginY', 'my', 'margin'], 0)};
  margin-bottom: ${getSpace(['marginBotton', 'mb', 'marginY', 'my', 'margin'], 0)};
  margin-left: ${getSpace(['marginLeft', 'ml', 'marginX', 'mx', 'margin'], 0)};
  margin-right: ${getSpace(['marginRight', 'mr', 'marginX', 'mx', 'margin'], 0)};
`

export const padding = styled.css`
  padding-top: ${getSpace(['paddingTop', 'pt', 'paddingY', 'py', 'padding'], 0)};
  padding-bottom: ${getSpace(['paddingBottom', 'pb', 'paddingY', 'py', 'padding'], 0)};
  padding-left: ${getSpace(['paddingLeft', 'pl', 'paddingX', 'px', 'padding'], 0)};
  padding-right: ${getSpace(['paddingRight', 'pr', 'paddingX', 'px', 'padding'], 0)};
`

export const spacePropTypes = (long, short) => {
  [long]
}
