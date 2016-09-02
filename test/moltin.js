
describe('Moltin Authentication Test', function() {

    it("should throw an error when a client id is not set", function() {
        var moltin = new Moltin();
        moltin.config.clientId = '';
        expect(function() { moltin.Authenticate() }).toThrow(new Error("You must have a client id set"));
    });

    it("should return a promise", function() {
      var moltin = new Moltin();
      var promise = moltin.Authenticate();
      expect(Promise.resolve(promise) == promise).toBe(true);
    });

    it("should authenticate correctly", function(done) {
      var moltin = new Moltin();

      var success = function(data) {
        expect(data).not.toBe(null);
      }

      var failure = function(error) {
        expect(error).toBe(null);
      }

      var promise = moltin.Authenticate()
          .then(success)
          .catch(failure)
          .then(done)
    });

  it("should store a token on authentication", function(done) {
    var moltin = new Moltin();

    var success = function(data) {
      expect(moltin.Storage.get('mtoken')).toEqual(data.access_token);
    }

    var failure = function(error) {
      expect(error).toBe(null);
    }

    var promise = moltin.Authenticate()
        .then(success)
        .catch(failure)
        .then(done)
  });
});

describe('Moltin Service Test', function() {

  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it("should return a promise when we make a service request", function() {
    var moltin = new Moltin();
    var promise = moltin.Products.List();
    expect(Promise.resolve(promise) == promise).toBe(true);
  });

  it("should return a list of products", function(done) {
    var moltin = new Moltin();

    var success = function(data) {
      expect(data).not.toEqual(null);
    }

    var failure = function(error) {
      expect(error).toBe(null);
    }

    var products = moltin.Products.List()
        .then(success)
        .catch(failure)
        .then(done);
  });
});
