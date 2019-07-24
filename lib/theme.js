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

const monokai = {
  "fg0": "#272822",
  "fg1": "#3e3d32",
  "fg2": "#75715e",
  "bg0": "#cfcfc2",
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
  
  "shade": [
    "var(--monokai-fg0)",
    "var(--monokai-fg1)",
    "var(--monokai-fg2)",
    "var(--monokai-fg2)",
    "var(--monokai-bg0)",
    "var(--monokai-bg1)"
  ],
   "shade-dark": [
    "var(--monokai-bg1)",
    "var(--monokai-bg0)",
    "var(--monokai-fg2)",
    "var(--monokai-fg2)",
    "var(--monokai-fg1)",
    "var(--monokai-fg0)"
  ],

  "link-text": "var(--monokai-cyan)",
  "link-background-text": "var(--monokai-violet)",
  "private": { "text": "var(--monokai-fg0)", "background": "var(--monokai-yellow)" },
  "cta": { "text": "var(--monokai-fg0)", "background": "var(--monokai-blue)" },
  "error": { "text": "var(--monokai-bg1)", "background": "var(--monokai-red)" },
  "warning": { "text": "var(--monokai-bg1)", "background": "var(--monokai-orange)" },
  "notification": { "text": "var(--monokai-bg1)", "background": "var(--monokai-violet)" },
  "success": { "text": "var(--monokai-fg0)", "background": "var(--monokai-green)" }
}



export const monokaiLight = {
  ...baseTheme,
  colors: {
    ...colorScale(monokai.fg0, monokai.fg1, monokai.fg2, '#e5e5e5', monokai.bg0, '#ffffff'),
    private: { text: '#222', background: '#fcf3b0' },
    cta: { text: '#222', background: '#83ffcd', hover: '#73efbd' },
    error: { text: '#fff', background: '#FF5F5F' },
    warning: { text: '#fff', background: '#FFAABF' },
    info: { text: '#fff', background: '#9588EA' },
    success: { text: '#fff', background: '#05D458' },
    selected: { text: '#fff', background: '#244776', secondary: 'rgba(255,255,255,0.6)' },
  },
}