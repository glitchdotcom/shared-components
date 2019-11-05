# Contributing

This guide is written for Glitch team members making changes to our shared-components project.

## Contribution Workflow

Create a remix of shared-components ([remix link](https://glitch.com/edit/#!/remix/shared-components)) and make all your changes within the remix

### Adding Emojis

All emoji assets live directly in the shared-components app's .glitch-assets.  To add a new emoji:
1. Make sure that Tiff or Edwin have approved it first
2. Resize and scale the emoji bitmap.  All emojis should be 64x64 pngs that have been compressed using [Pngyu](https://nukesaq88.github.io/Pngyu/).  Each image should be on the order of <~5kb in size.
3. Upload the image directly to [shared-component](https://glitch.com/edit/#!/shared-components) .glitch-assets (NOTE: the image is uploaded to shared-components, not your remix!)
4. In your remix, add the emoji alphabetically to `icons` in [icon.js](https://glitch.com/edit/#!/plump-chime?path=lib/icon.js:162:15).  The name should match that on [emojipedia](https://emojipedia.org/) and uses camelCase when needed.
5. Follow the rest of the steps below to finish submitting your PR.

### PR Workflow

Create a PR by using the `setup.sh` script (`my-remix` is a placeholder for your remix name):

`./sh/setup.sh my-remix`

If you want to update an existing PR, use the `update.sh` script:

`./sh/update.sh my-remix`

Once the PR is approved, you can merge your branch directly on Github.

### Updating the NPM Package

#### Create an account on NPM

First, you need to have an NPM account and be a contributor to the shared-components NPM package

1. Create an NPM Account at [npmjs.com/signup](https://www.npmjs.com/signup)

2. Provide your username to Jenn, Allyson, or Justin so they can add you as a contributor to the [shared-components NPM Package](https://www.npmjs.com/package/@fogcreek/shared-components)


#### Update the NPM Version 

Open the [shared-components app](https://shared-components.glitch.me) on Glitch, then run

```
# 1. Update the NPM version
npm version patch

# 2. Update changelog.md with your changes

# 3. Push your changes to Github
```

Finally, publish these changes to NPM
```
# 1. Locally, pull the latest changes from master

# 2. Publish to NPM
./sh/publish.sh shared-components --production
```






