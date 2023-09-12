# Contributing

## Working on React GMaps

### Install

Requirements:

- node
- pnpm

You can install the dependencies with the following:

```bash
pnpm install
```

Then you can start the build toolchain with:

```bash
pnpm dev
```

If you want to use a GoogleMaps API Key and/or a Map ID: at the root of the repo, copy the `.env.dist` and name it `.env` and fill-in with your secrets.
Theses env variables are going to be picked up by the projects in the `examples/` folder.

### Live preview

The easiest way to see a live preview of the changes you make, is to link your local version of react-gmaps to an example.

```bash
# cd in an appropriate example
cd examples/<folder>
# install the example dependencies
pnpm install
# link your local version of react-gmaps to the example
pnpm link ../..
# start the example
pnpm dev
```

Now any change you make in the React GMaps codebase will be reflected in the example project you started.

## Opening a new Pull Request

Once your ready to get your changes reviewed and merged, you can create a [Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

Before asking for a review, make sure to:

- Write a description of what you've changed and why.
- Link any related issue.
- Include a test that fails without your changes.
- Make sure the CI does not fail.
