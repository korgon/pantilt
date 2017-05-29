/*
websocket or API:
getPosition
moveAxis (goto: x, y);
calibrate
setSpeed
setHome
stop

client side script to sync with server side data
use Vue simply as a way to connect with this data

{
  token: blah,
  pan: stateFromServer,
  tilt: stateFromServer,
}
*/

'use strict';

var axios = require('axios');

var Client = function() {
	var storage = require('./storage.js');
	var sock = require('./socket.js');
	var self = this;

	var axii = undefined;
	var user = undefined;

	// holder for socket.io
	this.socket = undefined;

	this.init = function() {
		if (storage.jwt) {
			return initializeAxii().then(function() {
				return axii;
			});
		} else {
			console.log('NO JWT FOR INIT')
			return Promise.reject();
		}
	}

	this.authenticate = function(credentials) {
		if (storage.jwt) {
			console.log('JWT EXISTS!');
			return registerUser();
		} else if (credentials) {
			return axios.post('/login', credentials).then(function(resp) {
				if (!resp.data.token) {
					throw 'invalid login';
				}

				storage.saveToken(resp.data.token);

				return registerUser();
			});
		} else {
			return Promise.reject('creds');
		}
	}

	this.logout = function() {
		storage.clearToken();
		user = undefined;
		return user;
	}

	this.axii = {
		move: function(data) {
			return moveAxii(data)
		},
		setHome: function(data) {
			return setHome(data)
		},
		setSpeed: function(data) {
			return setSpeed(data)
		}
	}

	var registerUser = function() {
		return axios.get('/api/user', {
			headers: { 'Authorization': 'Bearer ' + storage.jwt }
		}).then(function(resp) {
			self.user = resp.data;

			// connect websocket!
			self.socket = sock.initialize(storage.jwt);

			return self.user;
		}).catch(function(err) {
			console.error(err);
			throw err;
		});
	}

	var initializeAxii = function() {
		return axios.get('/api/axii', {
			headers: { 'Authorization': 'Bearer ' + storage.jwt }
		}).then(function(resp) {
			axii = mutateAxii(resp.data);
		}).catch(function(err) {
			console.error(err);
			throw err;
		});
	}

	var mutateAxii = function(axii) {
		var mutatedAxii = {};

		for (var axis in axii) {
			if (!axii[axis].name && !axii[axis].current) {
				throw new Error('bad data');
			}
			mutatedAxii[axis] = mutateAxis(axii[axis]);
		}

		return mutatedAxii;
	}

	var mutateAxis = function(axis) {
		// for future usage...
		return axis;
	}

	var moveAxii = function(data) {
		console.log('data', data);
		return axios.post('/api/move', data, {
			headers: { 'Authorization': 'Bearer ' + storage.jwt }
		}).then(function(resp) {
			return 'moving...';
		}).catch(function(err) {
			console.error(err);
			throw err;
		});
	}

	var setValue = function(axis, value, data) {
		var path = '/api/axis/' + axis + '/' + value;
		return axios.post(path, data, {
			headers: { 'Authorization': 'Bearer ' + storage.jwt }
		}).then(function(resp) {
			axii[axis.name] = mutateAxis(resp.data);
		}).catch(function(err) {
			console.error(err);
			throw err;
		});
	}

	var setSpeed = function(data) {
		return axios.post('/api/speed', data, {
			headers: { 'Authorization': 'Bearer ' + storage.jwt }
		}).then(function(resp) {
			return axii = mutateAxii(resp.data);
		}).catch(function(err) {
			console.error(err);
			throw err;
		});
	}

	var setHome = function(data) {
		return axios.post('/api/home', data, {
			headers: { 'Authorization': 'Bearer ' + storage.jwt }
		}).then(function(resp) {
			return axii = mutateAxii(resp.data);
		}).catch(function(err) {
			console.error(err);
			throw err;
		});
	}
}

module.exports = new Client();
