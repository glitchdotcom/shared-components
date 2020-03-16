# shared-components
This is a library of React components used on Glitch's community site and editor.

## Installation
```sh
npm install @glitchdotcom/shared-components
```
 
This package has a peer dependency on React 16.8+ ("the one with hooks"); it also includes dependencies on prop-types and styled-components.

## Usage
For documentation of available components, see [shared-components.glitch.me](https://shared-components.glitch.me).

### Browser support
This works as-is in evergreen browsers, but it uses features which may require polyfills, transpilation, or other fallbacks:
- css custom properties (aka "css variables")
- ES2018 features (e.g. async/await, object spread)
- `<details>` and `<dialog>` HTML elements

### In production applications
In production applications, you will likely want to use the following babel plugins:
- [babel-plugin-styled-components](https://www.styled-components.com/docs/tooling#babel-plugin)
- [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types#readme)

## Contributing
For information on making changes to shared-components, refer to [CONTRIBUTING.md](https://glitch.com/edit/#!/shared-components?path=CONTRIBUTING.md:1:0)