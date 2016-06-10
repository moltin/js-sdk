# Moltin JavaScript SDK

The Moltin Javascript SDK is a simple to use interface for the Moltin eCommerce API to help you get off the ground quickly and efficiently within client and server applications.

The JS SDK is available in three flavours:
* [JavaScript](#js)
* [Node.js](#nodejs)
* [TVJS (AppleTV)](#tvjs)

## Building
We keep a compiled version of all SDKs in this repository within the `dist` folders and gziped versions within `dist/gzip`. If you make any changes to the `src` files you'll need to rebuild your copy of it which requires `node` and `npm`. If you don't already have these you can follow [this](https://docs.npmjs.com/getting-started/installing-node) guide.

Once you have these installed you will need to install our dependencies. To do this open terminal and navigate to your directory and run:
``` bash
npm install
```

### Once
To build the SDK you want to use, again open a terminal window, navigate to the root of your directory and run one of the following:
``` bash
# JavaScript
grunt build

# Node.js
grunt build --target nodejs

# TVJS
grunt build --target tvjs
```

This will then update all of the usable file versions within `dist` and `dist/gzip`.

### On Change
If you're planning on making a number of changes you can use the watch script to repeatedly build the SDKs each time you save a file. Open another terminal window, navigate to your directory and run one of the following:
``` bash
# JavaScript
grunt watch

# Node.js
grunt watch --target nodejs

# TVJS
grunt watch --target tvjs
```

## Getting Started
While the usage of all of our JavaScript SDKs are the same, the installation differs slightly between them, below we'll run through how to simply add an SDK to your project.

### JavaScript
The JavaScript SDK allows you to develop entirely client-side eCommerce websites quickly and easily.

> **Note**: Due to the security involved with client-side applications we lock down the resources you and your customers can access with this method.

#### Installation
To install the JavaScript SDK you can either use our CDN hosted version or include it yourself. To use our CDN copy simply add the following to your website:

``` html
<script src="https://js.moltin.com/v1"></script>
```

#### Initialise
Once you have the SDK added to your page you can start it up, to achieve that you'll need a [Moltin](https://moltin.com#signup) account and your stores `public_id`.

``` javascript
var moltin = new Moltin({publicId: 'XXXX'});
```

### Node.js
The Node.js SDK allows you to build complete server-side applications, with complete access to the Moltin APIs.

### Installation
To install the Node.js SDK you can use `npm` to manage the dependency. Open terminal and navigate to your project directory and run:

``` bash
npm install moltin@1.0.3
```

This will install the SDK into `node_modules/moltin`.

### Initialise
Once you have the dependancy installed you'll need to add it your project, to achieve that you'll need a [Moltin](https://moltin.com#signup) account and your stores `public_id` and `client_secret`. Once you have these add it with your other `require` tags at the start of your project:

``` javascript
var moltin = require('moltin')({
  publicId: 'XXXX',
  secretKey: 'XXXX'
});
```

### TVJS
The TVJS SDK is designed to run specifically in AppleTV's new client-server application model. Much like the JavaScript SDK it also uses a limited subset of the API for security purposes.

### Installation
To install the TVJS SDK drop a copy of the SDK into your project along side your other libararies and add it to your `resourceLoader`:

``` javascript
var javascriptFiles = [
    "${options.BASEURL}js/ResourceLoader.js",
    "${options.BASEURL}js/Presenter.js",
    "${options.BASEURL}js/moltin.tvjs.min.js"
];
```

### Initialise
Once you have the dependancy added to your project, you'll need a [Moltin](https://moltin.com#signup) account and your stores `public_id`. With this in hand you can start the SDK in the same way you do the JavaScript SDK.

``` javascript
var moltin = new Moltin({publicId: 'XXXX'});
```

## Usage
All of the JavaScript SDKs work in the same way after the initial installation has been completed.

### Authentication
To get started you'll need an access token, to get this you'll need to call the authentication method. We recommend wrapping your application's entry point inside the authentication method, this will attempt to authenticate every time your script is called but will not make the call until your token has expired.

``` javascript
moltin.Authenticate(function() {

  // Application starting point

});
```

### Some examples
Here are some examples of how to make common calls with the SDKs:

#### Getting a product
``` javascript
moltin.Product.Find({slug: 'decorative-hedgehogs'}, function(product) {
    // Handle the product
}, function(error) {
    // Something went wrong...
});
```

#### Add a product to the cart
``` javascript
moltin.Cart.Insert(product.id, 1, null, function(item) {
    // Update the cart display
}, function(error) {
    // Something went wrong...
});
```

#### Get a list of items in the cart
``` javascript
moltin.Cart.Contents(function(items) {
    // Update the cart display
}, function(error) {
    // Something went wrong...
});
```

#### Convert a cart to an order
``` javascript
moltin.Cart.Complete({
  gateway: 'dummy',
  customer: {
    first_name: 'Jon',
    last_name:  'Doe',
    email:      'jon.doe@gmail.com'
  },
  bill_to: {
    first_name: 'Jon',
    last_name:  'Doe',
    address_1:  '123 Sunny Street',
    address_2:  'Sunnycreek',
    city:       'Sunnyvale',
    county:     'California',
    country:    'US',
    postcode:   'CA94040',
    phone:      '6507123124'
  },
  ship_to: 'bill_to',
  shipping: 'free_shipping'
}, function(order) {
    // Handle the order
}, function(error) {
    // Something went wrong...
});
```

#### Process payment for an order
``` javascript
moltin.Checkout.Payment('purchase', order.id, {
  data: {
    number:       '4242424242424242',
    expiry_month: '02',
    expiry_year:  '2017',
    cvv:          '123'
  }
}, function(order) {
    // Handle the success page
}, function(error) {
    // Something went wrong...
});
```

> **Note**: You can find more information about the features and available endpoints in the [Documentation](https://moltin.github.io/documentation).

### Contributing
 - Fork it the repository
 - Create your feature branch (git checkout -b my-new-feature)
 - Commit your changes (git commit -am 'Add some feature')
 - Push to the branch (git push origin my-new-feature)
 - Create a new Pull Request

