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
This package renders its own documentation and development environment. You can edit this project by either creating a remix of shared-components ([remix link](https://glitch.com/edit/#!/remix/shared-components)) or working with it locally (Clone the repo, `npm install`, `npm start`). When running locally, you may wish to add a .env file so that the project consistently starts on the same port. See .sample.env for an example. 

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
import { Icon, createRemoteComponent } from '@fogcreek/shared-components'

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

#### Testing a version of shared-components in the community stie
You may decide you'd rather work locally or you'd rather test an entire version of shared-components before publishing. There are a number of different ways to do this but here is one possible route that may work for you:

1. cd into community
1. install your local copy of shared-componnents [using npm's local file path's feature](https://docs.npmjs.com/files/package.json#local-paths) ex: `npm install ../shared-components`
1. in community/aliases.js add to your webpack aliases: 
```
  react: path.resolve('./node_modules/react'),
  'styled-components': path.resolve('./node_modules/styled-components')
```
We do this because otherwise shared-components will use its own version of react and styled-components, and you'll get an [error message mentioning invalid hooks](https://reactjs.org/warnings/invalid-hook-call-warning.html) if you don't add the react alias. In theory any package shared-components uses that is also used by community will need a similar alias to ensure we're only using one dependency. 

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
1. First ensure you have the ability to [publish our package on npm](#becoming-a-maintainer-on-npm)
1. Once your PR has been approved, merge it on github
1. On your local machine bring master up to date:
`git checkout master` and `git pull origin master`
1. Update the NPM version
`npm version patch`
1. Update changelog.md with your changes and commit
1. Push your changes to Github
`git push origin master`
1. Consider if you'd like to publish a pre-release version or publish a regular version. Which ever you decide, make sure your local master branch is up to date and then run one of these commands locally:
    * Prereleases:
`./sh/publish.sh --rc`
    * Regular: `./sh/publish.sh --production`
1. Go to the [remix](https://glitch.com/~shared-components) (join if necessary), and `git pull origin master` so that if someone remixes they'll have the latest version.

#### Becoming a maintainer on NPM

First, you need to have an NPM account and be a contributor to the shared-components NPM package

1. Create an NPM Account at [npmjs.com/signup](https://www.npmjs.com/signup)

1. Ask in #pod-shared-components for someone to add you to the [FogCreek organization](https://docs.npmjs.com/adding-members-to-your-org). You should then automatically be an admin for shared-components

### Additional Resources
* [Styled Components Docs](https://www.styled-components.com/docs/basics#getting-started) 
* [How we built a component library that people actually enjoy using](https://medium.com/styled-components/how-to-build-a-great-component-library-a40d974a412d)
* [Styled Components: Enforcing Best Practices In Component-Based Systems](https://www.smashingmagazine.com/2017/01/styled-components-enforcing-best-practices-component-based-systems/)
* [Thinking in styled-components](https://itnext.io/thinking-in-styled-components-e230ea37c52c)
