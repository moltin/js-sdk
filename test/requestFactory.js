// Testing individual functions return the correct data
describe('Request Factory Functionality', function() {

  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    this.moltin = new Moltin()
  });

  // Should return a promise
  it('should return a promise when we call send', function() {
      var promise = this.moltin.RequestFactory.make('/', 'GET');
      expect(Promise.resolve(promise) == promise).toBe(true);
  });

  // Should return an object on success
  it('should return an object when its successful', function(done) {

      var success = function(data) {
        expect(data).not.toBeNull();
      }

      // Override some variables
      this.moltin.config.host = 'api.github.com';

      var promise = this.moltin.RequestFactory.make('/', 'GET')
        .then(success)
        .catch(new Error())
        .then(done);
  });

  it('should return an error when it is not successful', function(done) {

      var error = function(data) {
        expect(data).not.toBeNull();
      }

      // Override some variables
      this.moltin.config.host = 'api.github.com';

      var promise = this.moltin.RequestFactory.make('/v1', 'GET')
        .catch(error)
        .then(done);
  });
});
