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

const colorScale = (primary, secondary, border, secondaryBackground, hover, background) => ({
  primary,
  secondary,
  border,
  secondaryBackground,
  hover,
  background,
});

export const lightTheme = {
  ...baseTheme,
  colors: {
    ...colorScale('#222', '#666', '#B8B8B8', '#e5e5e5', '#f5f5f5', '#ffffff'),
    private: { text: '#222', background: '#fcf3b0' },
    cta: { text: '#222', background: '#83ffcd', hover: '#73efbd' },
    error: { text: '#fff', background: '#FF5F5F' },
    warning: { text: '#fff', background: '#FFAABF' },
    info: { text: '#fff', background: '#9588EA' },
    success: { text: '#fff', background: '#05D458' },
    selected: { text: '#fff', background: '#244776', secondary: 'rgba(255,255,255,0.6)' },
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    ...lightTheme.colors,
    ...colorScale('#fff', '#e5e5e5', '#c3c3c3', '#727272', '#666', '#222'),
  },
};
