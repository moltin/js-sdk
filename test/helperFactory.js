// Testing individual functions return the correct data
describe('Helper Factory Functionality', function(){

  beforeEach(function() {
      this.helper = new HelperFactory();
  });

  // Test merge function
  it("merges objects correctly together", function() {
      var obj1 = {a: 1, b: 2, c: 3}
      var obj2 = {a: "a", d: 4}
      var obj3 = {a: "a", b: 2, c: 3, d: 4}
      expect(this.helper.Merge(obj1, obj2)).toEqual(obj3);
  });

  // Test Serialize function
  it("serializes an object correctly", function() {
      var obj = {a: 1, b: 2}
      var prefix = "?";
      var serializedString = "%3F%5Ba%5D=1&%3F%5Bb%5D=2";
      expect(this.helper.Serialize(obj, prefix)).toEqual(serializedString);
  });

  // Test inArray function
  it("runs inarray correctly", function() {
      var arr = ["lister", "cat"];
      expect(this.helper.InArray("cat", arr)).toBe(true);
      expect(this.helper.InArray("rimmer", arr)).toBe(false);
  });
});
