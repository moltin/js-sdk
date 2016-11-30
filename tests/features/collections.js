describe('Moltin Collections Class', function() {
  beforeEach(function() {
    Moltin = moltin.gateway({
      publicId: 'umRG34nxZVGIuCSPfYf8biBSvtABgTR8GMUtflyE',
      currency: 'GBP'
    });
  });

  it('should return an array of multiple collection objects', function(done) {
    var success = function(response) {
      expect(response.data).toBeArrayOfObjects();
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = Moltin.Collections.List()
      .then(success)
      .catch(failure)
      .then(done);
  });

  it('should return an array with a single collection object', function(done) {
    var success = function(response) {
      var collectionId = response.data[0].id;

      var request = Moltin.Collections.Get(collectionId)
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

    var request = Moltin.Collections.List()
      .then(success)
      .catch(failure);
  });
});
