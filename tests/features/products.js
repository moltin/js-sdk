describe('Moltin Product Test', function() {

  beforeEach(function() {
    moltin = new Moltin();
  });

  it("should return a promise when we make a service request", function() {
    var promise = moltin.Products.List({limit: 1});
    expect(Promise.resolve(promise) == promise).toBe(true);
  });


  it("should return a list of products", function(done) {
    var success = function(data) {
      expect(data).not.toEqual(null);
    }

    var failure = function(error) {
      expect(error).toBe(null);
    }

    var products = moltin.Products.List({limit: 1})
      .then(success)
      .catch(failure)
      .then(done);
  });
});
