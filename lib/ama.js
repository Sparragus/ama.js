var hyperquest = require("hyperquest");
var concat = require("concat-stream");

var AMA = function (username, password) {
	this.apiURL = "https://api.caribetrack.com";

	this.username = username;
	this.password = password;
}

AMA.prototype.login = function() {
	var endpoint = "/login"
	var reqURL =  this.apiURL + endpoint;

	var self = this;

	var reqOptions = {
		headers: {
			username: this.username,
			password: this.password
		}
	}

	var req = hyperquest.get(reqURL, reqOptions);

	req.pipe(concat(function(data) {
		console.log(data.toString());
	}));
};

module.exports = AMA;