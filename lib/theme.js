const baseTheme = {
  space: ['0', '8px', '16px', '32px', '64px', '128px'],
  fontSizes: {
    tiny: '0.75rem',
    small: '0.875rem',
    normal: '1rem',
    big: '1.125rem',
    bigger: '1.375rem',
    huge: '2rem',
  },
  fonts: {
    mono: "Menlo, Consolas, Monaco, 'Lucida Console', monospace",
    sans: "'Benton Sans', Helvetica, sans-serif",
  },
  z: {
    notifications: 10,
  },
  // TODO: should these be in px or rem?
  breakpoints: ['414px', '592px', '670px', '900px', '1080px'],
  // Most badges/buttons will have capital letters, but many will not have descenders.
  // As a result, even padding on buttons frequently looks unbalanced,
  // so we apply extra padding to the top to correct this.
  // Note that this is font-specific and proportional to font size.
  opticalPadding: 'calc(0.35em + 1px) 0.5em 0.2em',
  rounded: '5px',
  popShadow: '0px 2px 5px 0px rgba(0,0,0,0.27), 0px 1px 1px 0px rgba(0,0,0,0.15)',
};

const colorScale = (primary, secondary, border, tertiaryBackground, secondaryBackground, background) => ({
  primary,
  secondary,
  border,
  tertiaryBackground,
  secondaryBackground,
  background,
});

// TODO
const hexToObject = (hex) => {
  const rgb = { r: 0, g: 0, b: 0 }
  let rhex, ghex, bhex
  if (hex.length === 4) {
    [,rhex, ghex, bhex] = /^#(\w)(\w)(\w)$/ 
  } else {
    [,rhex, ghex, bhex] = /^#(\w\w)(\w\w)(\w\w)$/ 
  }
  return {
    r: parseInt(rhex, 16) / 256,
    g: parseInt(rhex, 16) / 256,
    b: parseInt(bhex, 16) / 256,
  }
}

const colorSystem = (colors) => {
  
  
  return colors
}

export const lightTheme = {
  ...baseTheme,
  colors: colorSystem({
    primary: '#222',
    secondary: '#636363',
    border: '#B8B8B8',
    disabled: '#C3C3C3',
    secondaryBackground: '#f5f5f5',
    background: '#fff',
    //
    private: '#fcf3b0',
    cta: '#83ffcd',
    error: '#FF5F5F',
    warning: '#FFAABF',
    info: '#9588EA',
    success: '#05D458',
    selected: '#244776',
  }),
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    ...lightTheme.colors,
    ...colorScale('#fff', '#e5e5e5', '#c3c3c3', '#727272', '#666', '#222'),
  },
};

const monokai = {
  "fg0": "#272822",
  "fg1": "#3e3d32",
  "fg2": "#75715e",
  "bg0": "#cfcfc2",
  "bg05": "#E8E8DF",
  "bg1": "#f8f8f2",
  "yellow": "#e6db74",
  "orange": "#fd971f",
  "red": "#f92672",
  "magenta": "#fd5ff0",
  "violet": "#ae81ff",
  "blue": "#66d9ef",
  "cyan": "#a1efe4",
  "green": "#a6e22e"
}

export const monokaiLight = {
  ...baseTheme,
  colors: {
    ...colorScale(monokai.fg0, monokai.fg1, monokai.fg2, monokai.bg0, monokai.bg05, monokai.bg1),
    private: { text: monokai.fg0, background: monokai.yellow, },
    cta: { text: monokai.fg0, background: monokai.cyan, hover: '#73efbd' },
    error: { text: monokai.bg1, background: monokai.red },
    warning: { text: monokai.bg1, background: monokai.orange },
    info: { text: monokai.bg1, background: monokai.violet },
    success: { text: monokai.fg0, background: monokai.green },
    selected: { text: monokai.fg0, background: monokai.blue, secondary: 'rgba(255,255,255,0.6)' },
  },
}

export const monokaiDark = {
  ...baseTheme,
  colors: {
    ...monokaiLight.colors,
    ...colorScale(monokai.bg1, monokai.bg05, monokai.bg0, monokai.fg2, monokai.fg1, monokai.fg0),
  },
}

const solarized = {
  "base03": "#002b36",
  "base02": "#073642",
  "base01": "#586e75",
  "base00": "#657b83",
  "base0": "#839496",
  "base1": "#93a1a1",
  "base2": "#eee8d5",
  "base3": "#fdf6e3",
  "yellow": "#b58900",
  "orange": "#cb4b16",
  "red": "#d30102",
  "magenta": "#d33682",
  "violet": "#6c71c4",
  "blue": "#268bd2",
  "cyan": "#2aa198",
  "green": "#859900"
}
//   "shade": [
//     "var(--solarized-base01)",
//     "var(--solarized-base00)",
//     "var(--solarized-base0)",
//     "var(--solarized-base1)",
//     "var(--solarized-base2)",
//     "var(--solarized-base3)"
//   ],
//   "shade-dark": [
//     "var(--solarized-base1)",
//     "var(--solarized-base0)",
//     "var(--solarized-base00)",
//     "var(--solarized-base01)",
//     "var(--solarized-base02)",
//     "var(--solarized-base03)"
//   ],
//   "private": { "text": "var(--solarized-base3)", "background": "var(--solarized-yellow)" },
//   "cta": { "text": "var(--solarized-base3)", "background": "var(--solarized-blue)" },
//   "error": { "text": "var(--solarized-base3)", "background": "var(--solarized-red)" },
//   "warning": { "text": "var(--solarized-base3)", "background": "var(--solarized-orange)" },
//   "notification": { "text": "var(--solarized-base3)", "background": "var(--solarized-violet)" },
//   "success": { "text": "var(--solarized-base3)", "background": "var(--solarized-green)" }
// }

export const solarizedLight = {
  ...baseTheme,
  colors: {
    ...colorScale(solarized.base01, solarized.base00, solarized.base0, solarized.base1, solarized.base2, solarized.base3),
    private: { text: solarized.base3, background: solarized.yellow, },
    cta: { text: solarized.base3, background: solarized.cyan, hover: '#73efbd' },
    error: { text: solarized.base3, background: solarized.red },
    warning: { text: solarized.base3, background: solarized.orange },
    info: { text: solarized.base3, background: solarized.violet },
    success: { text: solarized.base3, background: solarized.green },
    selected: { text: solarized.base3, background: solarized.blue, secondary: 'rgba(255,255,255,0.6)' },
  },
}

export const solarizedDark = {
  ...baseTheme,
  colors: {
    ...solarizedLight.colors,
    ...colorScale(solarized.base1, solarized.base0, solarized.base00, solarized.base01, solarized.base02, solarized.base03),
  },
}