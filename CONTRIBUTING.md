# Contributing

This guide is written for Glitch team members making changes to our shared-components project.

## Table of Contents
- [Making changes to shared components](#making-changes-to-shared-components)
  * [Adding Emojis](#adding-emojis)
- [Viewing shared components in app context](#viewing-shared-components-in-app-context)
  * [Remote Components](#remote-components)
- [Code Review](#code-review)
- [Publishing and Deploying](#publishing-and-deploying)
  * [Becoming a maintainer on NPM](#becoming-a-maintainer-on-npm)
- [Additional Resources](#additional-resources)

### Making changes to shared components

#### Running the project
This package renders its own documentation and development environment. You can edit this project by either creating a remix of shared-components ([remix link](https://glitch.com/edit/#!/remix/shared-components)) or working with it locally (Clone the repo, `npm install`, `npm start`). When running locally, you may wish to add a .env file so that the project consistently starts on the same port. See .sample.env for an example. 

#### Adding a new component
1. Add the component you need in the appropriate `lib/type-of-thing.js` file.
2. Add some stories. 
   - A Story is a component exported from your `lib/` file whose name starts with `Story`. 
        - A Story with no underscore in the name will appear in the side navigation of the documentation page. (`StoryButton`)
        - A Story with an underscore in the name will _not_ appear in the side navigation, but can still be deep-linked to. ([`StoryTextInput_and_TextArea_variants](https://shared-components.glitch.me/#StoryTextInput_and_TextArea_variants))
   - If you've added stories to a new `lib/` file, add an import for that file at the top of `lib/stories.js` and add the variable you imported to the `modules` array.
   - All stories that are exported from files included in `stories.js` will appear on the documentation site. (the root webpage of your running app, or shared-components.glitch.me)
3. **important!** Export your new component from `lib/index.js`. This is how your component gets into the NPM shared-components package.

#### Adding Emojis
All emoji assets live directly in the shared-components app's .glitch-assets.  To add a new emoji:
1. Make sure that the changes has been approved by someone in #design
2. Resize and scale the emoji bitmap.  All emojis should be 64x64 pngs that have been compressed using [Pngyu](https://nukesaq88.github.io/Pngyu/).  Each image should be on the order of <~5kb in size.
3. Upload the image directly to [shared-component](https://glitch.com/edit/#!/shared-components) .glitch-assets (NOTE: the image is uploaded to shared-components, not your remix!)
4. In your remix, add the emoji alphabetically to `icons` in [icon.js](https://glitch.com/edit/#!/plump-chime?path=lib/icon.js:162:15).  The name should match that on [emojipedia](https://emojipedia.org/) and uses camelCase when needed.
5. Follow the rest of the steps below to finish submitting your PR.

### Viewing shared components in app context
While the components in shared-components should be the kind of components you can build in isolation of any particular consumer, you may wish to see it in the context of your application.

#### Remote components
One way to do that is to use this package's helper `createRemoteComponent` that loads a development version of the library from a URL. For example:

```js
import { Icon, createRemoteComponent } from '@glitchdotcom/shared-components'

const DevIcon = createRemoteComponent('https://sour-environment.glitch.me/module.js', 'Icon');
```

In the above case, `<Icon>` will render the Icon component as its defined in the version of shared-components on npm, but `<DevIcon>` will render the Icon component as its currently defined in the `sour-environment` remix of shared-components. If you change how Icon renders in this remix, it will be reflected in how DevIcon renders in your application.

Note that at this time, this only works for React components, not themes or other imports.

You can see a demo of this in `/test/remote-component/index.js`.
Create a remix of shared-components ([remix link](https://glitch.com/edit/#!/remix/shared-components)) and make all your changes within the remix .

Note:
- this does not currently work with SSR in the community site. The current work around is to go in Glitch-Community/server/routes.js and change this line:
```
const renderPage = require('./render');
```
to
```
const renderPage = () => ({ html: null, helmet: null, styleTags: null });
```
Another note: if you plan on using this component in multiple places you'll have to add the createRemoteComponent every place the component is used. This might be tricky if you're editing a component that's used widely, so you may wish to try the following process below instead.

#### Testing a version of shared-components in the community site
You may decide you'd rather work locally or you'd rather test an entire version of shared-components before publishing. There are a number of different ways to do this but here is one possible route that may work for you:

1. cd into shared-components
    1. run `npm link`
    1. run `npm run rollup:watch`
1. in your editor, in the community site project: 
    1. in aliases.js, add: 
    ```
    react: path.resolve('./node_modules/react'),
    'styled-components': path.resolve('./node_modules/styled-components'),
    ```

    We do this because otherwise shared-components will use its own version of react and styled-components, and you'll get an [error message mentioning invalid hooks](https://reactjs.org/warnings/invalid-hook-call-warning.html) if you don't add the react alias. In theory any package shared-components uses that is also used by community will need a similar alias to ensure we're only using one dependency. 

1. in a new terminal tab (`rollup:watch` should still be running in the shared-components tab), cd into community
   1. run `npm uninstall @glitchdotcom/shared-components`
   1. run `npm link @glitchdotcom/shared-components`
1. After making changes to a shared component that you'd like to see reflected in your community site build, restart the community server
   - you don't have to do anything in the terminal to rebuild shared-components; `rollup:watch` is handling that for you
   - there are supposedly ways to make you not have to restart community, by `touch`ing an application file after the rollup new build is available, but Cassey couldn't get them working - Webpack would rebuild, but it seemed to cache the node_modules parts, so new changes from shared-components weren't picked up.
   - see [NPM link troubleshooting guide](https://engineering.mixmax.com/blog/troubleshooting-npm-link) for more tips

## Cleaning up from `npm link`
Do this when you're done working with a local copy of shared-components inside a local version of community. **Don't skip this step!**
1. in community, in your terminal:
    1. run `npm unlink @glitchdotcom/shared-components`
1. in shared-components, in your terminal:
    1. stop the rollup watch process, if you haven't yet
    1. run `npm unlink`
1. back in community
    1. reinstall shared-components from NPM (`npm install @glitchdotcom/shared-components`)

Note: this process that was just outlined is kind of a pain and not particularly sustainable. If you find a better alternative feel free to update this documentation!

Another alternative to this process would be to [publish a prerelease version](#publishing-and-deploying). This is particularly convenient if you need to share this in-progress version with other teammates.

### Code Review
While shared-components is a cross-team collaboration, any stylistic changes should be reviewed by design to ensure we're keeping a cohesive feel across the site. When making a pull request, do add a member of the design team for review. 

If you've been working from a glitch remix of shared-components rather than locally you can use the following commands in your local terminal to setup a branch on github:

`./sh/setup.sh my-remix`

If you want to update an existing branch on github from work done on glitch.com, use the `update.sh` script:

`./sh/update.sh my-remix`

If you wish to update a glitch remix with changes from github, use the glitch terminal:
`git pull origin branch-name-on-github`

### Publishing and Deploying
1. First ensure that your PR is tagged with either `patch`, `minor` or `major`, this will determine the version bump
2. Once your PR has been approved, merge it on github
3. A [github action](https://github.com/glitchdotcom/shared-components/actions) will fire, creating a new version of the shared-components package and apply updates to CHANGELOG.md

### Other Labels
- `skip-release` will skip the github action and not create a new release when the PR is merged

### Additional Resources
* [Styled Components Docs](https://www.styled-components.com/docs/basics#getting-started) 
* [How we built a component library that people actually enjoy using](https://medium.com/styled-components/how-to-build-a-great-component-library-a40d974a412d)
* [Styled Components: Enforcing Best Practices In Component-Based Systems](https://www.smashingmagazine.com/2017/01/styled-components-enforcing-best-practices-component-based-systems/)
* [Thinking in styled-components](https://itnext.io/thinking-in-styled-components-e230ea37c52c)
