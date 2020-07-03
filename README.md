<img src="https://www.elasticpath.com/themes/custom/bootstrap_sass/logo.svg" alt="" width="400" />

# Elastic Path Commerce Cloud JavaScript SDK

[![npm version](https://img.shields.io/npm/v/@moltin/sdk.svg)](https://www.npmjs.com/package/@moltin/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/moltin/js-sdk/issues)
[![follow on Twitter](https://img.shields.io/twitter/follow/elasticpath?style=social&logo=twitter)](https://twitter.com/intent/follow?screen_name=elasticpath)

> A simple to use API interface to help get you off the ground quickly and efficiently with your Elastic Path Commerce Cloud JavaScript apps.

📚 [API reference](https://documentation.elasticpath.com/commerce-cloud/docs/developer/get-started/sdk.html#officially-supported-sdk) &mdash; 📚 [Elastic Path Commerce Cloud](https://www.elasticpath.com)

## 🛠 Installation

Install the package from [npm](https://www.npmjs.com/package/@moltin/sdk) and import in your project.

```bash
npm install --save @moltin/sdk
```

## ⛽️ Usage

To get started, instantiate a new Moltin client with your store credentials.

> **Note:** This requires an [Elastic Path Commerce Cloud](https://www.elasticpath.com) account.

```js
// JavaScript
import { gateway as MoltinGateway } from '@moltin/sdk'

const Moltin = MoltinGateway({
  client_id: 'XXX'
})

// Node.js
const MoltinGateway = require('@moltin/sdk').gateway

const Moltin = MoltinGateway({
  client_id: 'XXX',
  client_secret: 'XXX'
})
```

Alternatively you can include the `UMD` bundle via [UNPKG](https://unpkg.com) like so:

```js
<script src="https://unpkg.com/@moltin/sdk"></script>

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
Moltin.Authenticate().then(response => {
  console.log('authenticated', response)
})
```

Check out the [API reference](https://documentation.elasticpath.com/commerce-cloud/docs/api/index.html) to learn more about authenticating and the available endpoints.

### Custom Host

If you're an enterprise customer with your own infrastructure, you'll need to specify your API URL when instantiating:

```js
const Moltin = MoltinGateway({
  client_id: 'XXX',
  host: 'api.yourdomain.com'
})
```

### Custom Storage

By default the Elastic Path Commerce Cloud SDK persists data to `window.localStorage` in the browser and `node-localstorage` in Node. If this doesn't suit your needs you can override the default storage with a `MemoryStorageFactory` which will persist data for the life cycle of the JavaScript VM:

```js
import { gateway as MoltinGateway, MemoryStorageFactory } from '@moltin/sdk'

const Moltin = MoltinGateway({
  client_id: 'XXX',
  storage: new MemoryStorageFactory()
});
```

Or alternatively, create your own storage factory by passing in an object which implements the following interface:

```js
interface StorageFactory {
  set(key: string, value: string): void;
  get(key: string): string | null;
  delete(key: string): void;
}
```

### Included Headers

There are currently several optional headers you can pass into the configuration, which include `application`, `language` and `currency`.

You can pass them into the config used by the gateway like this:

```
// JavaScript
import { gateway as MoltinGateway } from '@moltin/sdk'
// const MoltinGateway = require('@moltin/sdk').gateway -> for Node

const Moltin = MoltinGateway({
    client_id: 'XXX',
    client_secret: 'XXX'
    currency: 'YEN',
    language: 'en',
    application: 'my-app'
})

``` 
 
## ❤️ Contributing

We love community contributions. Here's a quick guide if you want to submit a pull request:

1.  Fork the repository
2.  Add a test for your change (it should fail)
3.  Make the tests pass
4.  Commit your changes (see note below)
5.  Submit your PR with a brief description explaining your changes

> **Note:** Commits should adhere to the [Angular commit conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).

Make sure you have [Prettier](https://prettier.io) installed for your editor with ESLint integration enabled.

## ⚡️ Development

The SDK is built with [ES6 modules](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-modules/) that are bundled using [Rollup](http://rollupjs.org).

If you want to roll your own bundle, or make changes to any of the modules in `src`, then you'll need to install the package dependencies and run rollup while watching for changes.

```
npm install
npm start
```

You can learn more about the Rollup API and configuration [here](https://github.com/rollup/rollup/wiki).

## Terms And Conditions

- Any changes to this project must be reviewed and approved by the repository owner. For more information about contributing, see the [Contribution Guide](https://github.com/moltin/gatsby-demo-store/blob/master/.github/CONTRIBUTING.md).
- For more information about the license, see [MIT License](https://github.com/moltin/js-sdk/blob/master/LICENSE).
