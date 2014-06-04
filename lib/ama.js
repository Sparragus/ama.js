var hyperquest = require("hyperquest");
var concat = require("concat-stream");

var AMA = function (username, password) {
	this.apiURL = "https://api.caribetrack.com";

	this.username = username;
	this.password = password;

	this.token = null;

	this.assets = {
		hash: [],
		data: null
	};
	this.markers = {
		hash: [],
		data: null
	};
	this.geofences = {
		hash: [],
		data: null
	};
	this.drivers = {
		hash: [],
		data: null
	};
	this.groups = {
		hash: [],
		data: null
	};
};

AMA.prototype.login = function(callback) {
	var endpoint = "/login";
	var reqURL =  this.apiURL + endpoint;

	var self = this;

	var reqOptions = {
		headers: {
			username: this.username,
			password: this.password
		}
	};

	var req = hyperquest.get(reqURL, reqOptions);

	req.pipe(concat(function(body) {
		var data = JSON.parse(body);

		self.token = data.token;
		self.assets.hash = data.assetsHash;
		self.markers.hash = data.markersHash;
		self.geofences.hash = data.geofencesHash;
		self.drivers.hash = data.driversHash;
		self.groups.hash = data.groupsHash;
		
		if(typeof callback == "function") {
			callback();
		}
	}));
};

AMA.prototype.getAssets = function(callback) {
	var endpoint = "/assets";
	var reqURL =  this.apiURL + endpoint;

	var self = this;

	// Verify is token has been set. (If user has logged in)

	var reqOptions = {
		headers: {
			token: self.token,
		}
	};

	var req = hyperquest.get(reqURL, reqOptions);

	req.pipe(concat(function(body) {
		var data = JSON.parse(body);
		if(typeof callback == "function") {
			callback(data);
		}
	}));
};

AMA.prototype.getAssetsPosition = function(callback) {
	var endpoint = "/assetsPosition";
	var reqURL =  this.apiURL + endpoint;

	var self = this;

	// Verify is token has been set. (If user has logged in)

	var reqOptions = {
		headers: {
			token: self.token,
		}
	};

	var req = hyperquest.get(reqURL, reqOptions);

	req.pipe(concat(function(body) {
		var data = JSON.parse(body);
		callback(data);
	}));
};

AMA.prototype.getMarkers = function(callback) {
	var endpoint = "/markers";
	var reqURL =  this.apiURL + endpoint;

	var self = this;

	// Verify is token has been set. (If user has logged in)

	var reqOptions = {
		headers: {
			token: self.token,
		}
	};

	var req = hyperquest.get(reqURL, reqOptions);

	req.pipe(concat(function(body) {
		var data = JSON.parse(body);
		if(typeof callback == "function") {
			callback(data);
		}
	}));
};

AMA.prototype.getGeofences = function(callback) {
	var endpoint = "/geofences";
	var reqURL =  this.apiURL + endpoint;

	var self = this;

	// Verify is token has been set. (If user has logged in)

	var reqOptions = {
		headers: {
			token: self.token,
		}
	};

	var req = hyperquest.get(reqURL, reqOptions);

	req.pipe(concat(function(body) {
		var data = JSON.parse(body);
		if(typeof callback == "function") {
			callback(data);
		}
	}));
};

AMA.prototype.getGroups = function(callback) {
	var endpoint = "/groups";
	var reqURL =  this.apiURL + endpoint;

	var self = this;

	// Verify is token has been set. (If user has logged in)

	var reqOptions = {
		headers: {
			token: self.token,
		}
	};

	var req = hyperquest.get(reqURL, reqOptions);

	req.pipe(concat(function(body) {
		var data = JSON.parse(body);
		if(typeof callback == "function") {
			callback(data);
		}
	}));
};

AMA.prototype.testToken = function(callback) {
	var endpoint = "/testToken";
	var reqURL =  this.apiURL + endpoint;

	var self = this;

	// Verify is token has been set. (If user has logged in)

	var reqOptions = {
		headers: {
			token: self.token,
		}
	};

	var req = hyperquest.get(reqURL, reqOptions);

	req.pipe(concat(function(body) {
		var data = JSON.parse(body);
		if(typeof callback == "function") {
			callback(data);
		}
	}));
};

module.exports = AMA;