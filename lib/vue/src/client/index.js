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
var socket = io();

var Client = function() {
	var storage = require('./storage.js');
	var self = this;

	var axii = undefined;
	var user = undefined;

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
			return getUser().then(function(user) {
				return self.user = user;
			});
		} else if (credentials) {
			return axios.post('/login', credentials).then(function(resp) {
				if (!resp.data.token) {
					throw 'invalid login';
				}

				storage.saveToken(resp.data.token);

				return getUser();
			});
		} else {
			return Promise.reject('creds');
		}
	}

	this.logout = function() {
		storage.clearToken();
		user = undefined;
	}

	var getUser = function() {
		return axios.get('/api/user', {
			headers: { 'Authorization': 'Bearer ' + storage.jwt }
		}).then(function(resp) {
			user = resp.data;
			return user;
		}).catch(function(err) {
			console.log(err);
			throw err;
		});
	}

	var initializeAxii = function() {
		return axios.get('/api/axis', {
			headers: { 'Authorization': 'Bearer ' + storage.jwt }
		}).then(function(resp) {
			axii = mutateAxii(resp.data);
		}).catch(function(err) {
			console.log(err);
			throw err;
		});
	}

	var mutateAxii = function(axii) {
		var mutatedAxii = {};

		for (var axis in axii) {
			mutatedAxii[axis] = mutateAxis(axii[axis]);
		}

		return mutatedAxii;
	}

	var mutateAxis = function(axis) {
		return {
			name: axis.name,
			type: axis.type,
			current: axis.current,
			bounds: {
				max: axis.max,
				min: axis.min,
				range: axis.range
			}
		}
	}
}

module.exports = new Client();
