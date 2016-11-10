describe('Moltin Currency Service Test', function() {
  beforeEach(function() {
    moltin = new Moltin();
    currency = 'YEN';
  });

  it('should return an array of available currencies', function(done) {
    var success = function(response) {
      expect(response).not.toBe({ data: [] });
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = moltin.Currency.List()
      .then(success)
      .catch(failure)
      .then(done);
  });

  it('should set the active currency', function(done) {
    var success = function(response) {
      expect(response).toBe(currency);
    };

    var failure = function(error) {
      expect(error).not.toBe(currency);
    };

    var request = moltin.Currency.Set(currency)
      .then(success)
      .catch(failure)
      .then(done);
  });

  it('should return the active currency', function(done) {
    var success = function(response) {
      var request = moltin.Currency.Active()
        .then((response) => {
          expect(response).toBe(currency);
        })
        .then(done);
    };

    var failure = function(error) {
      expect(error).not.toBe(currency);
    };

    var request = moltin.Currency.Set(currency)
      .then(success)
      .catch(failure);
  });
});
