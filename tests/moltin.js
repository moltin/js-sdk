describe('Moltin Class', function() {
  beforeEach(function() {
    moltin = new Moltin();
  });

  it('should throw an error when a client id is not set', function() {
    moltin.config.clientId = '';

    var authenticate = function() {
      moltin.Authenticate();
    };

    expect(authenticate).toThrow(new Error('You must have a client id set'));
  });

  it('should return a promise', function() {
    var promise = moltin.Authenticate();

    expect(Promise.resolve(promise) === promise).toBe(true);
  });

  it('should authenticate correctly', function(done) {
    var success = function(response) {
      expect(response).not.toBe(null);
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = moltin.Authenticate()
      .then(success)
      .catch(failure)
      .then(done);
  });

  it('should re-authenticate if the token is expired', function(done) {
    var success = function() {
      moltin.Storage.set('mtoken', '');

      var request = moltin.Products.List()
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
});
