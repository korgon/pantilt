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
	var authorized = false;

	this.axis = undefined;
	this.user = undefined;

	this.init = function() {
		if (storage.jwt) {
			return initializeAxii().then(function(axis) {
				self.axis = axis;
				return self.user;
			});
		} else {
			console.log('NO JWT FOR INIT')
			return Promise.reject();
		}
		// self.initializeAxii().then(function() {
		// 	console.log('axis initialized!');
		// });
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

				storage.jwt = resp.data.token;
				storage.saveToken(resp.data.token);

				return resp.data.user;
			});
		} else {
			return Promise.reject('creds');
		}
	}

	this.logout = function() {
		storage.clearToken();
	}

	var getUser = function() {
		return axios.get('/api/user', {
			headers: { 'Authorization': 'Bearer ' + storage.jwt }
		}).then(function(resp) {
			return resp.data;
		}).catch(function(err) {
			console.log(err);
			throw err;
		});
	}

	var initializeAxii = function() {
		return axios.get('/api/axis', {
			headers: { 'Authorization': 'Bearer ' + storage.jwt }
		}).then(function(resp) {
			return resp.data;
		}).catch(function(err) {
			console.log(err);
			throw err;
		});
	}
}

module.exports = new Client();
