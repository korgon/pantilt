// socket.io functionality

var Socket = function() {
	var self = this;
	var isAuthenticated;
	var socket;

	this.initialize = function(token) {
		if (token && !isAuthenticated) {
			console.log('init sock!');

			socket = io.connect('', {
				query: 'token=' + token
			});

			socket.on('connect', function () {
				console.log('connected!!!');
				socket.emit('test');
			});

			socket.on('authenticated', function () {
				isAuthenticated = true;
				console.log('socket is jwt authenticated');
			});
		}

		socket.on('disconnect', function () {
			console.log('disconnected');
		});
	}

	this.socket = socket;
}

module.exports = new Socket();
