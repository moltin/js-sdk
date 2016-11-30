describe('Moltin Class', function() {
  beforeEach(function() {
    Moltin = moltin.gateway({
      publicId: 'umRG34nxZVGIuCSPfYf8biBSvtABgTR8GMUtflyE'
    });
  });

  it('should throw an error when a client id is not set', function() {
    Moltin.config.clientId = '';

    var authenticate = function() {
      Moltin.Authenticate();
    };

    expect(authenticate).toThrow(new Error('You must have a client id set'));
  });

  it('should return a promise', function() {
    var promise = Moltin.Authenticate();

    expect(Promise.resolve(promise) === promise).toBe(true);
  });

  it('should authenticate correctly', function(done) {
    var success = function(response) {
      expect(response).not.toBe(null);
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = Moltin.Authenticate()
      .then(success)
      .catch(failure)
      .then(done);
  });

  it('should re-authenticate if the token is expired', function(done) {
    var success = function() {
      Moltin.storage.delete('mtoken');

      var request = Moltin.Products.List()
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

    var request = Moltin.Products.List()
      .then(success)
      .catch(failure);
  });
});
