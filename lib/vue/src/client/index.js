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

	this.axis = {};
	this.user = {};

	this.init = function() {
		if (storage.jwt) {
			return self.getUser().then(self.initializeAxii());
		} else {
			return Promise.reject();
		}
		// self.initializeAxii().then(function() {
		// 	console.log('axis initialized!');
		// });
	}

	this.authenticate = function(credentials) {
		return axios.post('/login', credentials).then(function(resp) {
			storage.saveToken(resp.data.token);
			return { name: resp.data.name, lastlogin: resp.data.lastlogin };
		}).catch(function(err) {
			console.log(err);
			throw(err);
		});
	}

	this.getUser = function() {
		return axios.get('/api/user', {
			headers: { 'Authorization': 'Bearer ' + storage.jwt }
		}).then(function(resp) {
			self.user = resp.data;
		}).catch(function(err) {
			console.log(err);
			throw err;
		});
	}

	this.initializeAxii = function() {
		return axios.get('/api/axis', {
			headers: { 'Authorization': 'Bearer ' + storage.jwt }
		}).then(function(resp) {
			self.axis = resp.data;
		}).catch(function(err) {
			console.log(err);
			throw err;
		});
	}
}

module.exports = new Client();
