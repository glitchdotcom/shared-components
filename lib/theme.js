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
};

const colorScale = (primary, secondary, border, hover, secondaryBackground, background) => ({
  primary,
  secondary,
  border,
  hover,
  secondaryBackground,
  background,
});

export const lightTheme = {
  ...baseTheme,
  colors: {
    ...colorScale('#222', '#727272', '#B8B8B8', '#C3C3C3', '#e5e5e5', '#ffffff'),
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
