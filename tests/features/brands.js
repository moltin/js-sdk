describe('Moltin Brands Class', function() {
  beforeEach(function() {
    moltin = new Moltin();
  });

  it('should return an array of multiple brand objects', function(done) {
    var success = function(response) {
      expect(response.data).toBeArrayOfObjects();
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = moltin.Brands.List()
      .then(success)
      .catch(failure)
      .then(done);
  });

  it('should return an array with a single brand object', function(done) {
    var success = function(response) {
      var brandId = response.data[0].id;

      var request = moltin.Brands.Get(brandId)
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

    var request = moltin.Brands.List()
      .then(success)
      .catch(failure);
  });
});
