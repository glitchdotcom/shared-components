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
