// API

'use strict';

var fs = require('fs');
var jwt = require('koa-jwt');

// rsa keys
var publicKey = fs.readFileSync(__dirname + '/../keys/panny.rsa.pub');
var privateKey = fs.readFileSync(__dirname + '/../keys/panny.rsa');

// must pass in the springboard dependency
module.exports = function(project) {
	let options = project.getOptions();

	return {
		// Get example
		// dealGet: function*() {
		// 	this.response.type = 'json';
		// 	this.response.body = yield springboard.getStatus();
		// },

		// Post example
		// dealPost: function*() {
		// 	this.response.type = 'json';
		// 	let postData = this.request.body.fields;
		// 	this.response.body = 'api response';
		// }

		login: function*() {
			let claims = this.request.fields;

			// TODO verify claims...
			if (!claims || !claims.username || !claims.password) {
				this.status = 200;
				this.body = { error: 'invalid login' };
			} else {
				let token = jwt.sign(claims, privateKey, { algorithm: 'RS256' });

				// do some login logging here...

				this.status = 200;
				this.body = { token: token, user: { name: claims.username, lastlogin: 'now......' } };
			}
		},

		// get all axii
		getUser: function*() {
			this.response.type = 'json';
			this.response.body = { name: this.user.username, lastlogin: 'now......' };
		},

		// get all axii
		getAxii: function*() {
			this.response.type = 'json';
			this.response.body = yield project.getAxii();
		},

		// get specific axis
		getAxis: function*() {
			let data = yield project.getAxis(this.params.axis);
			this.response.type = 'json';
			this.response.body = data;
		},

		// get specific axis
		getAxisCurrent: function*() {
			let data = yield project.getAxisCurrent(this.params.axis);
			this.response.type = 'json';
			this.response.body = data;
		},

		move: function*() {
			this.response.type = 'json';

			let info = this.request.fields;

			try {
				this.response.body = yield project.moveAxii(info);
			}
			catch(err) {
				this.response.type = 'json';
				this.response.body = { error: true, message: err.message || err, action: err.action || 'unknown' };
			}
		},

		setAxiiHome: function*() {
			this.response.type = 'json';

			let info = this.request.fields;

			try {
				this.response.body = yield project.setAxiiHome(info);
			}
			catch(err) {
				this.response.type = 'json';
				this.response.body = { error: true, message: err.message || err, action: err.action || 'unknown' };
			}
		},

		setAxiiSpeed: function*() {
			this.response.type = 'json';

			let info = this.request.fields;

			try {
				this.response.body = yield project.setAxiiSpeed(info);
			}
			catch(err) {
				this.response.type = 'json';
				this.response.body = { error: true, message: err.message || err, action: err.action || 'unknown' };
			}
		},

		setHome: function*() {
			this.response.type = 'json';
			let info = this.request.fields;

			try {
				this.response.body = yield project.setHome(this.params.axis, info.home);
			}
			catch(err) {
				this.response.type = 'json';
				this.response.body = { error: true, message: err.message || err, action: err.action || 'unknown' };
			}
		},

		setSpeed: function*() {
			this.response.type = 'json';
			let info = this.request.fields;

			try {
				this.response.body = yield project.setSpeed(this.params.axis, info.speed);
			}
			catch(err) {
				this.response.type = 'json';
				this.response.body = { error: true, message: err.message || err, action: err.action || 'unknown' };
			}
		},
	}
}
