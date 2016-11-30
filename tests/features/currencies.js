describe('Moltin Currency Class', function() {
  beforeEach(function() {
    Moltin = moltin.gateway({
      publicId: 'umRG34nxZVGIuCSPfYf8biBSvtABgTR8GMUtflyE',
      currency: 'GBP'
    });
    currency = 'YEN';
  });

  it('should return an array of available currencies', function(done) {
    var success = function(response) {
      expect(response.data).toBeArrayOfObjects();
    };

    var failure = function(error) {
      expect(error).toBe(null);
    };

    var request = Moltin.Currencies.List()
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

    var request = Moltin.Currencies.Set('YEN')
      .then(success)
      .catch(failure)
      .then(done);
  });

  it('should return the active currency', function(done) {
    var success = function(response) {
      var request = Moltin.Currencies.Active()
        .then((response) => {
          expect(response).toBe(currency);
        })
        .then(done);
    };

    var failure = function(error) {
      expect(error).not.toBe(currency);
    };

    var request = Moltin.Currencies.Set(currency)
      .then(success)
      .catch(failure);
  });
});
