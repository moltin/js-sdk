# Moltin JS-SDK

The Moltin Javascript SDK is a simple to use interface for the API to help you get off the ground quickly and efficiently within Javascript.

## Installation

### CDN

You can use our CDN to get the latest version of the JS SDK like so:

```html
<script src="https://js.moltin.com/v1"></script>
```

### Building from source


## Usage

### Configuration

**Options Required**
```javascript
var options = {
    publicId: 'YOUR_PUBLIC_API_KEY'
}
```

**Optional overrides**
```javascript
var options = {
    url: 'https://api.molt.in/',
    version: 'v1',
    debug: false
}
```

**Initialize the SDK**

```javascript
var moltin = new Moltin(options);
```

### Authentication

Just set the `publicId` from the api console on Moltin website and you are ready to go.

```javascript
var moltin = new Moltin({publicId: 'XXXX'});
moltin.Authenticate(function() {

  // Make your calls here

});
```

### Some examples

Here are some examples of handling the callback:

**Getting a product**

```javascript
var product = moltin.Product.Find({slug: 'decorative-hedgehogs'});
```

**Creating a user's address:**

```javascript
var item = moltin.Cart.Insert(product.id, 1, null);
```

### More help
You can find out how to use the JS SDK more here:

http://docs.moltin.com/1.0/quickstart/js


### Contributing

 - Fork it the repository
 - Create your feature branch (git checkout -b my-new-feature)
 - Commit your changes (git commit -am 'Add some feature')
 - Push to the branch (git push origin my-new-feature)
 - Create a new Pull Request
