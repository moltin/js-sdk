describe('Moltin Cart Test', function() {
  beforeEach(function() {
    moltin = new Moltin()
    product = '2e21c70e-65bc-4bd5-80ed-2e193eb988a6'
  });

  it('should add a product to the cart', function(done) {
    var success = function(response) {
      expect(response).not.toBe({ data: [] })
    }

    var failure = function(error) {
      expect(error).toBe(null)
    }

    var request = moltin.Cart.Insert(product, 1)
      .then(success)
      .catch(failure)
      .then(done)
  })

  it('should return an array of cart contents', function(done) {
    var success = function(response) {
      expect(response).not.toBe({ data: [] })
    }

    var failure = function(error) {
      expect(error).toBe(null)
    }

    var request = moltin.Cart.Contents()
      .then(success)
      .catch(failure)
      .then(done);
  })

  it('should update the quantity of a cart item', function(done) {
    var success = function(response) {
      // Get the `id` of cart item we just added
      var productId = response.data[0].id

      var request = moltin.Cart.Quantity(productId, 2)
        .then((response) => {
          expect(response.data[0].quantity).toEqual(2)
        })
        .then(done)
    }

    var failure = function(error) {
      expect(error).toBe(null);
    }

    var request = moltin.Cart.Contents()
      .then(success)
      .catch(failure)
  })

  it('should remove a product from the cart', function(done) {
    var success = function(response) {
      // Get the `id` of cart item we just added
      var productId = response.data[0].id

      var request = moltin.Cart.Remove(productId)
        .then((response) => {
          expect(response).not.toBe({ data: [] })
        })
        .then(done)
    }

    var failure = function(error) {
      expect(error).toBe(null);
    }

    var request = moltin.Cart.Contents()
      .then(success)
      .catch(failure)
  })

  it('should delete a cart', function(done) {
    var success = function(response) {
      // Get the `id` of the cart
      var cartId = moltin.Storage.get('mcart');

      var request = moltin.Cart.Delete()
        .then((response) => {
          expect(response).toEqual({
            data: [{
              type: 'cart',
              id: cartId
            }]
          })
        })
        .then(done);
    }

    var failure = function(error) {
      expect(error).toBe(null);
    }

    var request = moltin.Cart.Insert(product, 1)
      .then(success)
      .catch(failure)
  })
})
