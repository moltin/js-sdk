describe('Moltin Brands Class', function() {
  beforeEach(function() {
    Moltin = moltin.gateway({
      publicId: 'umRG34nxZVGIuCSPfYf8biBSvtABgTR8GMUtflyE'
    });
  });

  it('should return an array of multiple brand objects', function(done) {
    var success = function(response) {
      expect(response.data).toBeArrayOfObjects();
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    return Moltin.Brands.List()
      .then(success)
      .catch(failure)
      .then(done);
  });

  it('should return an array with a single brand object', function(done) {
    var success = function(response) {
      var brandId = response.data[0].id;

      var request = Moltin.Brands.Get(brandId)
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

    var request = Moltin.Brands.List()
      .then(success)
      .catch(failure);
  });
});
