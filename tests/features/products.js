describe('Moltin Products Class', function() {
  beforeEach(function() {
    Moltin = moltin.gateway({
      publicId: 'umRG34nxZVGIuCSPfYf8biBSvtABgTR8GMUtflyE',
      currency: 'GBP'
    });
  });

  it('should return a promise when we make a service request', function() {
    var promise = Moltin.Products.List();

    expect(Promise.resolve(promise) === promise).toBe(true);
  });


  it('should return an array of multiple product objects', function(done) {
    var success = function(response) {
      expect(response.data).toBeArrayOfObjects();
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = Moltin.Products.List()
      .then(success)
      .catch(failure)
      .then(done);
  });
});
