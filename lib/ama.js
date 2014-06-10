var hyperquest = require("hyperquest");
var concat = require("concat-stream");

var AMA = function (username, password) {
	this.apiURL = "https://api.caribetrack.com/v1";

	this.username = username;
	this.password = password;

	this.token = "null";

	this.assets = {
		hash: [],
		data: null,
		changed: true
	};

	this.groups = {
		hash: [],
		data: null,
		changed: true
	};
};

function login (callback) {


	var self = this;

	var endpoint = "/login";
	var reqURL =  self.apiURL + endpoint;


	var reqOptions = {
		headers: {
			username: self.username,
			password: self.password
		}
	};

	var req = hyperquest.get(reqURL, reqOptions);

	req.pipe( concat(function(body) {
		var data = JSON.parse(body.toString());

		self.token = data.token;

		// Assets
		if ( self.assets.hash && self.assets.hash == data.assetsHash) {
			self.assets.changed = false;
		} else {
			self.assets.hash = data.assetsHash;
			self.assets.changed = true;
		}

		// Groups
		if ( self.groups.hash && self.groups.hash == data.groupsHash) {
			self.groups.changed = false;
		} else {
			self.groups.hash = data.groupsHash;
			self.groups.changed = true;
		}
		
		callback();
		
	}));
}

AMA.prototype.getAssets = function(callback) {
	var endpoint = "/assets";
	var reqURL =  this.apiURL + endpoint;

	var self = this;

	var reqOptions = {
		headers: {
			token: self.token
		}
	};

	// If assets has been set, return it. Otherwise, fetch it, store it, return it.
	if ( !self.assets.changed ) {
		callback(self.assets.data);
	}
	else {
		var req = hyperquest.get(reqURL, reqOptions);


		req.pipe(concat(function(body) {
			var response = body.toString();
			// Check for errors
			if ( response == "Invalid Token" || response == "Token Expired") {
				// login() again and save new token.
				login.apply(self, [function() {
					self.getAssets(callback);
				}]);
			}
			else {
				var data = JSON.parse(response);
				self.assets.data = data;
				self.assets.changed = false;

				callback(self.assets.data);
			}
		}));
	}
};

AMA.prototype.getAssetsPosition = function(callback) {
	var endpoint = "/assetsPosition";
	var reqURL =  this.apiURL + endpoint;

	var self = this;

	var reqOptions = {
		headers: {
			token: self.token
		}
	};

	var req = hyperquest.get(reqURL, reqOptions);

	req.pipe(concat(function(body) {
		var response = body.toString();
		// Check for errors
		if ( response == "Invalid Token" || response == "Token Expired") {
			// login() again and save new token.
			login.apply( self, [function() {
				self.getAssetsPosition(callback);
			}]);
		}
		else {
			var data = JSON.parse(response);
			callback(data);
		}
	}));
};

AMA.prototype.getGroups = function(callback) {
	var endpoint = "/groups";
	var reqURL =  this.apiURL + endpoint;

	var self = this;

	var reqOptions = {
		headers: {
			token: self.token
		}
	};

	// If groups has been set, return it. Otherwise, fetch it, store it, return it.
	if ( !self.groups.changed ) {
		callback(self.groups.data);
	}
	else {
		var req = hyperquest.get(reqURL, reqOptions);

		req.pipe(concat(function(body) {
			var response = body.toString();
			// Check for errors
			if ( response == "Invalid Token" || response == "Token Expired") {
				// login() again and save new token.
				login.apply( self, [function() {
					self.getGroups(callback);
				}]);
			}
			else {
				var data = JSON.parse(response);

				self.groups.data = data;
				self.groups.changed = false;

				callback(self.groups.data);
			}
		}));
	}
};

AMA.prototype.testToken = function(callback) {
	var endpoint = "/testToken";
	var reqURL =  this.apiURL + endpoint;

	var self = this;

	var reqOptions = {
		headers: {
			token: self.token
		}
	};

	var req = hyperquest.get(reqURL, reqOptions);

	req.pipe(concat(function(body) {
		var response = body.toString();
		// Check for errors
		if ( response == "Invalid Token" || response == "Token Expired") {
			// login() again and save new token.
			login.apply( self, [function() {
				self.testToken(callback);
			}]);
		}
		else {
			var data = JSON.parse(response);
			callback(data);
		}
	}));
};

module.exports = AMA;