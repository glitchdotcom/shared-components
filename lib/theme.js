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
    overlay: 15,
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
    hoverFilter: hasLightText ? 'brightness(110%)' : 'brightness(90%)',
  })
  
  return {
    primary: options.primary,
    secondary: options.secondary,
    placeholder: options.placeholder,
    border: options.border,
    secondaryBackground: options.secondaryBackground,
    background: options.background,
    tertiary: withContext(options.tertiary),
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
    placeholder: '#B8B8B8',
    border: '#C3C3C3',
    secondaryBackground: '#f5f5f5',
    background: '#fff',
    //
    tertiary: darkText('#e5e5e5'),
    private: darkText('#fcf3b0'),
    cta: darkText('#83ffcd'),
    error: lightText('#FF5F5F'),
    warning: darkText('#FFAABF'),
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
    placeholder: '#C3C3C3',
    border: '#B8B8B8',
    secondaryBackground: '#636363',
    background: '#222',
    //
    tertiary: darkText('#e5e5e5'),
    private: darkText('#fcf3b0'),
    cta: darkText('#83ffcd'),
    error: lightText('#FF5F5F'),
    warning: darkText('#FFAABF'),
    info: lightText('#9588EA'),
    success: lightText('#05D458'),
    selected: lightText('#244776'),
  }),
};

const monokai = {
  "fg0": "#272822",
  "fg1": "#3e3d32",
  "fg2": "#75715e",
  "fg3": "#ABA99A",
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
  colors: colorSystem({
    dark: false,
    //
    primary: monokai.fg0,
    secondary: monokai.fg1,
    placeholder: monokai.fg2,
    border: monokai.fg3,
    secondaryBackground: monokai.bg05,
    background: monokai.bg1,
    //
    tertiary: darkText(monokai.bg0),
    private: darkText(monokai.yellow),
    cta: darkText(monokai.cyan),
    error: lightText(monokai.red),
    warning: lightText(monokai.orange),
    info: lightText(monokai.violet),
    success: darkText(monokai.green),
    selected: darkText(monokai.blue),
  }),
}

export const monokaiDark = {
  ...baseTheme,
  colors: colorSystem({
    dark: true,
    //
    primary: monokai.bg1,
    secondary: monokai.bg05,
    placeholder: monokai.fg3,
    border: monokai.fg2,
    secondaryBackground: monokai.fg1,
    background: monokai.fg0,
    //
    tertiary: darkText(monokai.bg0),
    private: darkText(monokai.yellow),
    cta: darkText(monokai.cyan),
    error: lightText(monokai.red),
    warning: lightText(monokai.orange),
    info: lightText(monokai.violet),
    success: darkText(monokai.green),
    selected: darkText(monokai.blue),
  }),
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

export const solarizedLight = {
  ...baseTheme,
  colors: colorSystem({
    dark: false,
    //
    primary: solarized.base01,
    secondary: solarized.base00,
    placeholder: solarized.base0,
    border: solarized.base1,
    secondaryBackground: solarized.base2,
    background: solarized.base3,
    //
    tertiary: lightText(solarized.base1),
    private: lightText(solarized.yellow),
    cta: lightText(solarized.cyan),
    error: lightText(solarized.red),
    warning: lightText(solarized.orange),
    info: lightText(solarized.violet),
    success: lightText(solarized.green),
    selected: lightText(solarized.blue),
  }),
}

export const solarizedDark = {
  ...baseTheme,
  colors: colorSystem({
    dark: true,
    //
    primary: solarized.base1,
    secondary: solarized.base0,
    placeholder: solarized.base00,
    border: solarized.base01,
    secondaryBackground: solarized.base02,
    background: solarized.base03,
    //
    tertiary: darkText(solarized.base1),
    private: darkText(solarized.yellow),
    cta: darkText(solarized.cyan),
    error: darkText(solarized.red),
    warning: darkText(solarized.orange),
    info: darkText(solarized.violet),
    success: darkText(solarized.green),
    selected: darkText(solarized.blue),
  }),
}
