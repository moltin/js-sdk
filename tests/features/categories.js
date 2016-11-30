describe('Moltin Categories Class', function() {
  beforeEach(function() {
    Moltin = moltin.gateway({
      publicId: 'umRG34nxZVGIuCSPfYf8biBSvtABgTR8GMUtflyE',
      currency: 'GBP'
    });
  });

  it('should return an array of multiple category objects', function(done) {
    var success = function(response) {
      expect(response.data).toBeArrayOfObjects();
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = Moltin.Categories.List()
      .then(success)
      .catch(failure)
      .then(done);
  });

  it('should return an array with a single category object', function(done) {
    var success = function(response) {
      var categoryId = response.data[0].id;

      var request = Moltin.Categories.Get(categoryId)
        .then((response) => {
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

    var request = Moltin.Categories.List()
      .then(success)
      .catch(failure);
  });

  it('should return the category tree', function(done) {
    var success = function(response) {
      expect(response.data).toBeArrayOfObjects();
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = Moltin.Categories.Tree()
      .then(success)
      .catch(failure)
      .then(done);
  });

  it('should return a category object and associated products', function(done) {
    var success = function(response) {
      var categoryId = response.data[0].id;

      var request = Moltin.Categories.Get(categoryId, 'products')
        .then((response) => {
          expect(response.data).toBeArrayOfSize(1);
          expect(response.included.products).toBeArrayOfObjects();
        })
        .catch((error) => {
          expect(error).toBe(null);
        })
        .then(done);
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = Moltin.Categories.List()
      .then(success)
      .catch(failure);
  });
});
