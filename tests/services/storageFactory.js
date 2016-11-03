// Storage tests
describe('Storage Factory Functionality', function(){

    beforeEach(function() {
        var moltin = new Moltin();
        this.storage = moltin.Storage;
    });

    // Test Storage
    it("should set get and delete storage correctly", function() {
        var key = "lister";
        var value = "smeghead";
        var days = 1;

        // Set and get
        this.storage.set(key, value, days);
        expect(this.storage.get(key)).toMatch(value);

        // Delete and get
        this.storage.delete(key);
        expect(this.storage.get(key)).toBe(null);
    });
});
