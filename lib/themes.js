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
  // Note that this is font-specific and proportional to font size,
  // and at smaller sizes this is complicated by pixel rounding.
  opticalPadding: '0.375em 0.5em 0.1875em',
  rounded: '5px',
  popShadow: '0px 2px 5px 0px rgba(0,0,0,0.27), 0px 1px 1px 0px rgba(0,0,0,0.15)',
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: '#222',
    secondary: '#636363',
    placeholder: '#B8B8B8',
    border: '#C3C3C3',
    secondaryBackground: '#f5f5f5',
    background: '#fff',
    tertiary: {
      text: '#222',
      background: '#e5e5e5',
    },
    private: {
      text: '#222',
      background: '#fcf3b0',
    },
    error: {
      text: '#fff',
      background: '#FF5F5F',
    },
    warning: {
      text: '#222',
      background: '#FFAABF',
    },
    notice: {
      text: '#fff',
      background: '#9588EA',
    },
    success: {
      text: '#fff',
      background: '#05D458',
    },
    selected: {
      text: '#fff',
      background: '#244776',
    },
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#fff',
    secondary: '#f5f5f5',
    placeholder: '#C3C3C3',
    border: '#B8B8B8',
    secondaryBackground: '#636363',
    background: '#222',
  },
};
