// storage functionality
// store token as well as user settings

var Storage = function() {
	var self = this;

	this.saveToken = function(token) {
		jwt = token;
		if (typeof(Storage) == 'function') {
			localStorage.setItem('pantilt_jwt', token);
		}
	}

	this.getToken = function() {
		return localStorage.getItem('pantilt_jwt');
	}

	this.clearToken = function() {
		localStorage.removeItem('pantilt_jwt');
	}

	this.jwt = self.getToken();
}

module.exports = new Storage();
