describe('Moltin Cart Class', function() {
  beforeEach(function() {
    moltin = new Moltin();
  });

  it('should add a product to the cart', function(done) {
    var success = function(response) {
      var productId = response.data[0].id;

      var request = moltin.Cart.Insert(productId, 1)
        .then((response) => {
          expect(response.data).toBeArrayOfObjects();
        })
        .catch((error) => {
          expect(error).toBe(null);
        })
        .then(done);
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = moltin.Products.List()
      .then(success)
      .catch(failure);
  });

  it('should return an array of cart item objects', function(done) {
    var success = function(response) {
      expect(response.data).toBeArrayOfObjects();
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = moltin.Cart.Contents()
      .then(success)
      .catch(failure)
      .then(done);
  });

  it('should update the quantity of a cart item', function(done) {
    var success = function(response) {
      var productId = response.data[0].id;

      var request = moltin.Cart.Quantity(productId, 2)
        .then((response) => {
          expect(response.data[0].quantity).toEqual(2);
        })
        .catch((error) => {
          expect(error).toBe(null);
        })
        .then(done);
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = moltin.Cart.Contents()
      .then(success)
      .catch(failure);
  });

  it('should remove a product from the cart', function(done) {
    var success = function(response) {
      var itemId = response.data[0].id;

      var request = moltin.Cart.Remove(itemId)
        .then((response) => {
          expect(response).toEqual({
            data: [{
              type: 'cart_item',
              id: itemId
            }]
          });
          expect(response.data).toBeArrayOfSize(1);
        })
        .catch((error) => {
          expect(error).toBe(null);
        })
        .then(done);
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = moltin.Cart.Contents()
      .then(success)
      .catch(failure);
  });

  it('should delete a cart', function(done) {
    var success = function(response) {
      var productId = response.data[0].id;

      var insert = moltin.Cart.Insert(productId, 1)
        .then(deletion)
        .catch(failure);

      var deletion = moltin.Cart.Delete()
        .then((response) => {
          var cartId = moltin.Storage.get('mcart');

          expect(response).toEqual({
            data: [{
              type: 'cart',
              id: cartId
            }]
          });
        })
        .catch((error) => {
          expect(error).toBe(null);
        })
        .then(done);
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = moltin.Products.List()
      .then(success)
      .catch(failure);
  });
});
