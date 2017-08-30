# Moltin JavaScript SDK

[![npm version](https://img.shields.io/npm/v/@moltin/sdk.svg)](https://www.npmjs.com/package/@moltin/sdk)

> A simple to use API interface to help get you off the ground quickly and efficiently with your Moltin JavaScript apps.

📚 [Wiki](https://github.com/moltin/js-sdk/wiki) &mdash; 📚 [API docs](https://moltin.api-docs.io/v2) &mdash; 📚 [moltin.com](https://moltin.com)

## Installation

Install the package from [npm](https://www.npmjs.com/package/@moltin/sdk) and import in your project.

```bash
npm install --save @moltin/sdk
```

## Usage

To get started, instantiate a new Moltin client with your store credentials.

> **Note:** This requires a [Moltin](http://moltin.com) account.

```js
// JavaScript
import { gateway as MoltinGateway } from '@moltin/sdk';

const Moltin = MoltinGateway({
  client_id: 'XXX'
});

// Node.js
const MoltinGateway = require('@moltin/sdk').gateway;

const Moltin = MoltinGateway({
  client_id: 'XXX',
  client_secret: 'XXX',
});
```

Alternatively you can include the `UMD` bundle via [UNPKG](https://unpkg.com) like so:

```js
<script src="https://unpkg.com/@moltin/sdk">

<script>
  const Moltin = moltin.gateway({
    client_id: 'XXX'
  });
</script>
```

> **Note:** If you're using [webpack](https://webpack.github.io), you'll need to add the following to your projects configuration file.

```js
node: {
  fs: 'empty'
}
```

You can now authenticate with the Moltin service 🎉

```js
Moltin.Authenticate().then((response) => {
  console.log('authenticated', response);
});
```

Check out the [wiki](https://github.com/moltin/js-sdk/wiki) to learn more about authenticating and the available endpoints.

### Custom Host

If you're an enterprise customer with your own infrastructure, you'll need to specify your API URL when instantiating:

```js
const Moltin = MoltinGateway({
  client_id: 'XXX',
  host: 'api.yourdomain.com'
});
```


## Contributing

We love community contributions. Here's a quick guide if you want to submit a pull request:

1. Fork the repository
2. Add a test for your change (it should fail)
3. Make the tests pass
4. Commit your changes (see note below)
5. Submit your PR with a brief description explaining your changes

> **Note:** Commits should adhere to the [Angular commit conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).


## Development

The SDK is built with [ES6 modules](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-modules/) that are bundled using [Rollup](http://rollupjs.org).

If you want to roll your own bundle, or make changes to any of the modules in `src`, then you'll need to install the package dependencies and build the `dist` files.

```
npm install
npm run build
```

You can learn more about the Rollup API and configuration  [here](https://github.com/rollup/rollup/wiki).
