# shared-components

This is a library of React components for shar

## Browser support
This works as-is in evergreen browsers, but it uses features which may require polyfills, transpilation, or other fallbacks:
- css custom properties (aka "css variables")
- ES2018 features (e.g. async/await, object spread)
- `<details>` and `<dialog>` HTML elements

In production applications, you will likely want to use the following babel plugins:
- [babel-plugin-styled-components](https://www.styled-components.com/docs/tooling#babel-plugin)
- [babel-plugin]

## Installation

```sh
npm install @glitch/shared-components
```

This package has a peer dependency on React 16.8+ ("the one with hooks"); it also includes dependencies on prop-types, styled-components, and react-textarea-autosize.

## Usage

For documentation of available components, see [shared-components.glitch.me](https://shared-components.glitch.me).

## Development

