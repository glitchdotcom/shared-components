# Contributing

This guide is written for Glitch team members making changes to our shared-components project.

## Contribution Workflow

Create a remix of shared-components ([remix link](https://glitch.com/edit/#!/remix/shared-components)) and make all your changes within the remix

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
./shpublish.sh shared-components --production
```






