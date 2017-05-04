# Moltin JavaScript SDK

> The Moltin Javascript SDK is a simple to use interface for the Moltin eCommerce API to help you get off the ground quickly and efficiently within client and server applications.

[Wiki](https://github.com/moltin/js-sdk/wiki) &mdash; [API docs](https://moltin.api-docs.io/v2) &mdash; [moltin.com](https://moltin.com)

## Installation

```bash
npm install --save moltin
```

#### JavaScript

```js
import { gateway as MoltinGateway } from 'moltin';
```

#### Node.js

```js
const moltin = require('moltin');
```

## Usage

To get started, instantiate a new Moltin client with your store credentials.

> **Note:** This requires a [Moltin](http://moltin.com) account.

#### JavaScript

```js
const Moltin = MoltinGateway({
  client_id: 'XXX'
});
```

> **Note:** If you're using [webpack](https://webpack.github.io), you'll need to add the following to your projects configuration file.

```
node: {
  fs: 'empty'
}
```

#### Node.js

```js
const Moltin = moltin.gateway({
  client_id: 'XXX',
  client_secret: 'XXX',
});
```

You can now authenticate with the Moltin service.

```js
Moltin.Authenticate().then((response) => {
  console.log('authenticated', response);
});
```

Check out the [wiki](https://github.com/moltin/js-sdk/wiki) to learn more about authenticating and the available endpoints.


## Development

The SDK is built with [ES6 modules](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-modules/) that are bundled into Node and browser compatible files using [Rollup](http://rollupjs.org).

If you want to roll your own bundle, or make changes to any of the modules in `src`, then you'll need to install the package dependencies and build the `dist` files.

```
npm install
npm run build
```

You can learn more about Rollup, the API and configuration  [here](https://github.com/rollup/rollup/wiki).
