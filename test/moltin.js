describe('SDK Core Tests', function(){

  // Test new moltin
  var options = {
      clientId: '',
      clientSecret: '',
      auth: {},
      url: 'api.molt.in',
      port: '443',
      protocol: 'https',
      version: 'v2',
      debug: false,
      currency: false,
      language: false
  }
  //var moltin = new Moltin(options);
  console.log(Moltin(options));

  // Test overrides

  // Test merge

  // Test Serialize

  // Test InArray





  describe('one', function(){
    it('should be awesome', function(){
      expect('foo').toMatch('foo');
    });
  });

  describe('two', function(){
    it('should be equally awesome', function(){
      expect('woot').toMatch('woot');
    });
  });

});
