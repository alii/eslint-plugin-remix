# eslint-plugin-remix

An ESLint plugin for [Remix](https://remix.run)

## Installing

1. Firstly, install the dependency with Yarn `yarn add eslint-plugin-remix --dev` or with npm `npm install eslint-plugin-remix --save-dev`.
2. Add `remix` to your plugins array in your eslint configuration file.
3. Enable rules by writing `"remix/<rule-name>": "error"` in your eslint configuration file.

## Rules:

### `node-server-imports`:

Ensures that all imports for known node builtins are only ever used in `.server.ts` files.
