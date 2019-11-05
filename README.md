# shared-components
This is a library of React components used on Glitch's community site and editor.

## Installation
```sh
npm install @fogcreek/shared-components
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

## Development
This package also renders its own documentation and development environment.

For more on making changes to shared-components, refer to [CONTRIBUTING.md](https://glitch.com/edit/#!/shared-components?path=CONTRIBUTING.md:1:0)

### Remote components
While you are building or updating a component in this library, you may wish to see it in the context of your application. This package exports the helper `createRemoteComponent` that loads a development version of the library from a URL. For example:

```js
import { Icon, createRemoteComponent } from '@fogcreek/shared-components'

const DevIcon = createRemoteComponent('https://sour-environment.glitch.me/module.js', 'Icon');
```

In the above case, `<Icon>` will render the Icon component as its defined in the version of shared-components on npm, but `<DevIcon>` will render the Icon component as its currently defined in the `sour-environment` remix of shared-components. If you change how Icon renders in this remix, it will be reflected in how DevIcon renders in your application.

Note that at this time, this only works for React components, not themes or other imports.

You can see a demo of this in `/test/remote-component/index.js`.
