$(function() {

	// Helpers
	Object.prototype.firstItem = function() { return this[Object.keys(this)[0]]; }
	
	// Get example code
	var str = $('script[type="text/javascript"]').html();
	str     = str.replace("({publicId: '85e4IP87t5jlB5w2Lv366UX0pJB69D2A0g309SSk'})", "({publicId: '<YOUR PUBLIC ID>'})");
	str     = str.replace("      $('#sample').html(JSON.stringify(response, null, '\\t'));\n\n", '');

	// Implement code
	$('#code').text(str.trim());

});