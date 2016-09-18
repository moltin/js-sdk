# Moltin JavaScript SDK

Shit left to sort out:

 - Complete move from coffee-script by breaking up the main JS file
 - Create proper factories and DI
 - Make tests use Request Mocking
 - Standardise error responses
 - Catch API errors
 - Create multiple storage drivers
 - Finish readme
 - Create build process
 - Version SDK and CDN version correctly
 - Finish examples

### Usage

```js
// List of products
var moltin = new Moltin();
moltin.Products.List()
  .then(function(data) {
    console.log(data);
  });
```

### Local dev

Install dependencies with ```npm```

```
npm install
```

### Tests

Once dependencies are installed, you can run tests with Karma:

```
grunt karma
```
