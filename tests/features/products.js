describe('Moltin Products Class', function() {
  beforeEach(function() {
    moltin = new Moltin();
  });

  it('should return a promise when we make a service request', function() {
    var promise = moltin.Products.List();

    expect(Promise.resolve(promise) === promise).toBe(true);
  });


  it('should return an array of multiple product objects', function(done) {
    var success = function(response) {
      expect(response.data).toBeArrayOfObjects();
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = moltin.Products.List()
      .then(success)
      .catch(failure)
      .then(done);
  });
});
