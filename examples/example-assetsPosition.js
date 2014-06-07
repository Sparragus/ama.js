var credentials = require('./credentials');

var AMA = require('../lib/ama');
var ama = new AMA(credentials.username, credentials.password);

// Prints the list of buses and the coordinates.
ama.getAssetsPosition(function (data) {
	console.log("Result: ",data);
});