
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

    it("should re-authenticate if the token is expired", function(done) {
      var moltin = new Moltin();

      var success = function(data) {

        moltin.Storage.set('mtoken', '');
        var a = moltin.Storage.get('mtoken', '');
        console.log(a);


        var products = moltin.Products.List({limit: 1})
          .then(function(data) {
            console.log(data);
            console.log("suc");

          }).catch(function(err) {
            console.log("err");
            console.log(err)
          }).then(done)
      }

      var failure = function(error) {
        console.log("FAIL");
        expect(error).toBe(null);
      }

      var products = moltin.Products.List({limit: 1})
          .then(success)
          .catch(failure)
    });
});


describe('Moltin Service Test', function() {

  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it("should return a promise when we make a service request", function() {
    var moltin = new Moltin();
    var promise = moltin.Products.List({limit: 1});
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

    var products = moltin.Products.List({limit: 1})
        .then(success)
        .catch(failure)
        .then(done);
  });
});
