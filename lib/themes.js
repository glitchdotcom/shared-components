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
  rounded: '5px',
  popShadow: '0px 2px 5px 0px rgba(0,0,0,0.27), 0px 1px 1px 0px rgba(0,0,0,0.15)',
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: '#222',
    secondary: '#636363',
    placeholder: '#707070',
    border: '#C3C3C3',
    secondaryBackground: '#f5f5f5',
    background: '#fff',
    focused: '#A2D7FF',
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
      background: '#DC352C',
    },
    warning: {
      text: '#222',
      background: '#ffdadf',
    },
    notice: {
      text: '#fff',
      background: '#7460E1',
    },
    success: {
      text: '#222',
      background: '#47F68D',
    },
    selected: {
      text: '#fff',
      background: '#244776',
    },
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#fff',
    secondary: '#f5f5f5',
    placeholder: '#e0e0e0',
    border: '#B8B8B8',
    secondaryBackground: '#636363',
    background: '#222',
  },
};
