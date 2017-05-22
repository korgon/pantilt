// socket.io functionality

var Socket = function() {
	var self = this;
	var isAuthenticated;
	var socket;

	this.initialize = function(token) {
		if (token && !isAuthenticated) {
			console.log('initializing websocket connection...');

			socket = io.connect('', {
				query: 'token=' + token
			});

			socket.on('connect', function () {
				console.log('connected!!!');
			});

			return socket;
		}
	}
}

module.exports = new Socket();
