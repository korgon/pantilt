// storage functionality
// store token as well as user settings

var Storage = function() {
	var self = this;

	this.saveToken = function(token) {
		self.jwt = token;
		if (typeof(Storage) == 'function') {
			sessionStorage.setItem('pantilt_jwt', token);
		}
	}

	this.getToken = function() {
		if (typeof(Storage) == 'function') {
			return sessionStorage.getItem('pantilt_jwt');
		}
	}

	this.clearToken = function() {
		if (typeof(Storage) == 'function') {
			sessionStorage.removeItem('pantilt_jwt');
		}
		self.jwt = undefined;
	}

	this.jwt = self.getToken();
}

module.exports = new Storage();
