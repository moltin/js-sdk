describe('Moltin Categories Test', function() {
  beforeEach(function() {
    moltin = new Moltin()
    category = '89f3484e-b5ff-4b63-9130-ced368f21cb1'
  })

  it('should return a list of categories', function(done) {
    var success = function(response) {
      expect(response).not.toBe({ data: [] })
    }

    var failure = function(error) {
      expect(error).toBe(null);
    }

    var request = moltin.Categories.List()
      .then(success)
      .catch(failure)
      .then(done)
  })

  it('should return a category', function(done) {
    var success = function(response) {
      expect(response).not.toBe({ data: [] })
    }

    var failure = function(error) {
      expect(error).toBe(null)
    }

    var request = moltin.Categories.Get(category)
      .then(success)
      .catch(failure)
      .then(done)
  })

  it('should return the category tree', function(done) {
    var success = function(response) {
      expect(response).not.toBe({ data: [] })
    }

    var failure = function(error) {
      expect(error).toBe(null)
    }

    var request = moltin.Categories.Tree()
      .then(success)
      .catch(failure)
      .then(done)
  })

  it('should return categories and their children and products', function(done) {
    var success = function(response) {
      expect(response).not.toBe({ data: [] })
    }

    var failure = function(error) {
      expect(error).toBe(null)
    }

    var request = moltin.Categories.List(['children', 'products'])
      .then(success)
      .catch(failure)
      .then(done)
  })
})
