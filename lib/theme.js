const rems = (value) => `${value}rem`;

const mapValues = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value, key)]));

const baseTheme = {
  space: [0, 0.5, 1, 2, 4, 8].map(rems),
  fontSizes: mapValues(
    {
      tiny: 0.75,
      small: 0.875,
      normal: 1,
      big: 1.125,
      bigger: 1.375,
      huge: 2,
    },
    rems,
  ),
  fonts: {
    mono: "Menlo, Consolas, Monaco, 'Lucida Console', monospace",
    sans: "'Benton Sans', Helvetica, sans-serif",
  },
  breakpoints: ['414px', '592px', '670px', '900px', '1080px'],
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
    ...colorScale('#222', '#555', '#B8B8B8', '#e5e5e5', '#f5f5f5', '#ffffff'),
    private: { text: '#222', background: '#fcf3b0' },
    cta: { text: '#222', background: '#83ffcd', hover: '#73efbd' },
    error: { text: '#fff', background: '#FF5F5F' },
    warning: { text: '#fff', background: '#FFAABF' },
    notification: { text: '#fff', background: '#9588EA' },
    success: { text: '#fff', background: '#05D458' },
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    ...lightTheme.colors,
    ...colorScale('#fff', '#e5e5e5', '#c3c3c3', '#b8b8b8', '#727272', '#222'),
  },
};
