import styled from 'styled-components';

const themeValue = (themeGroupName, propNames, allowNegative = false) => (props) => {
  const themeGroup = props.theme[themeGroupName];
  for (const key of propNames) {
    if (!(key in props)) continue;
    if (!themeGroup) return props[key];

    if (props[key] in themeGroup) return themeGroup[props[key]];
    if (allowNegative && -props[key] in themeGroup) return -themeGroup[props[key]];
    return props[key];
  }
  return undefined;
};

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

// inspired by styled-system (without the breakpoints)
export const space = styled.css`
  margin-top: ${themeValue('space', ['marginTop', 'mt', 'marginY', 'my', 'margin', 'm'], true)};
  margin-bottom: ${themeValue('space', ['marginBottom', 'mb', 'marginY', 'my', 'margin', 'm'], true)};
  margin-left: ${themeValue('space', ['marginLeft', 'ml', 'marginX', 'mx', 'margin', 'm'], true)};
  margin-right: ${themeValue('space', ['marginRight', 'mr', 'marginX', 'mx', 'margin', 'm'], true)};

  padding-top: ${themeValue('space', ['paddingTop', 'pt', 'paddingY', 'py', 'padding', 'p'], true)};
  padding-bottom: ${themeValue('space', ['paddingBottom', 'pb', 'paddingY', 'py', 'padding', 'p'], true)};
  padding-left: ${themeValue('space', ['paddingLeft', 'pl', 'paddingX', 'px', 'padding', 'p'], true)};
  padding-right: ${themeValue('space', ['paddingRight', 'pr', 'paddingX', 'px', 'padding', 'p'], true)};
`;

export const color = styled.css`
  color: ${themeValue('colors', ['color'])};
  background-color: ${themeValue('colors', ['backgroundColor', 'bg'])};
`;

export const typography = styled.css`
  font-size: ${themeValue('fontSizes', ['fontSize'])};
  font-family: ${themeValue('fonts', ['fontFamily'])};
`;
