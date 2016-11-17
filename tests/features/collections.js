describe('Moltin Collections Class', function() {
  beforeEach(function() {
    moltin = new Moltin();
  });

  it('should return an array of multiple collection objects', function(done) {
    var success = function(response) {
      expect(response.data).toBeArrayOfObjects();
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = moltin.Collections.List()
      .then(success)
      .catch(failure)
      .then(done);
  });

  it('should return an array with a single collection object', function(done) {
    var success = function(response) {
      var collectionId = response.data[0].id;

      var request = moltin.Collections.Get(collectionId)
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

    var request = moltin.Collections.List()
      .then(success)
      .catch(failure);
  });
});
