# shared-components
This is a library of React components used on Glitch's community site and editor.

### Install from NPM

This package is installed in the github packages repo, so you have to do a little
configuration to set up your NPM to download the design system.

In your project, ensure there is a `.npmrc` file containing:
`registry=https://npm.pkg.github.com/glitchdotcom`

Generate an [access token](https://github.com/settings/tokens) with the permissions `repo`, `write:packages` and `read:packages`.

(TODO: save this access token to your dotfiles for cutting canary releases)

In your terminal, login npm to your github account with your username and the access token as your password:
`npm login --registry=https://npm.pkg.github.com/`

Then you can install the design system:
`npm install @glitchdotcom/shared-components`

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