// socket.io functionality

var socket = io();

var Socket = function() {
	var self = this;

	this.connect = function(token) {
		if (token) {
			socket.connect('', {
				query: 'token=' + token
			}, function() {
				console.log('connection completed.')
			});
		}
	}

	this.socket = socket;

	socket.on('connect', function () {
		console.log('authenticated!!!');
	}).on('disconnect', function () {
		console.log('disconnected');
	});
}

module.exports = new Socket();
