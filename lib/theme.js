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

const darkText = (background) => ({ hasLightText: false, background })
const lightText = (background) => ({ hasLightText: true, background })

const colorSystem = (options) => {
  const fixedTextColors = options.dark ? {
    darkText: options.background,
    darkSecondary: options.secondaryBackground,
    lightText: options.primary,
    lightSecondary: options.secondary,
  } : {
    darkText: options.primary,
    darkSecondary: options.secondary,
    lightText: options.background,
    lightSecondary: options.secondaryBackground,
  }
  
  const withContext = ({ hasLightText, background }) => ({
    text: hasLightText ? fixedTextColors.lightText : fixedTextColors.darkText,
    secondary: hasLightText ? fixedTextColors.lightSecondary : fixedTextColors.darkSecondary,
    background: background,
    hoverFilter: hasLightText ? 0.8 : 1.2,
  })
  
  return {
    primary: options.primary,
    secondary: options.secondary,
    border: options.border,
    disabled: options.disabled,
    secondaryBackground: options.secondaryBackground,
    background: options.background,
    private: withContext(options.private),
    cta: withContext(options.cta),
    error: withContext(options.error),
    warning: withContext(options.warning),
    info: withContext(options.info),
    success: withContext(options.success),
    selected: withContext(options.selected),
  }
}

export const lightTheme = {
  ...baseTheme,
  colors: colorSystem({
    dark: false,
    //
    primary: '#222',
    secondary: '#636363',
    border: '#B8B8B8',
    disabled: '#C3C3C3',
    secondaryBackground: '#f5f5f5',
    background: '#fff',
    //
    private: darkText('#fcf3b0'),
    cta: darkText('#83ffcd'),
    error: lightText('#FF5F5F'),
    warning: lightText('#FFAABF'),
    info: lightText('#9588EA'),
    success: lightText('#05D458'),
    selected: lightText('#244776'),
  }),
};

export const darkTheme = {
  ...baseTheme,
  colors: colorSystem({
    dark: true,
    //
    primary: '#fff',
    secondary: '#f5f5f5',
    border: '#C3C3C3',
    disabled: '#B8B8B8',
    secondaryBackground: '#636363',
    background: '#222',
    //
    private: darkText('#fcf3b0'),
    cta: darkText('#83ffcd'),
    error: lightText('#FF5F5F'),
    warning: lightText('#FFAABF'),
    info: lightText('#9588EA'),
    success: lightText('#05D458'),
    selected: lightText('#244776'),
  }),
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