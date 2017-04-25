// API

'use strict';

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

		setSpeed: function*() {
			this.response.type = 'json';
			let info = this.request.body.fields;

			try {
				this.response.body = yield project.setSpeed(this.params.axis, info.speed);
			}
			catch(err) {
				this.response.type = 'json';
				this.response.body = { error: true, message: err.message || err, action: err.action || 'unknown' };
			}
		},

		setHome: function*() {
			this.response.type = 'json';
			let info = this.request.body.fields;

			try {
				this.response.body = yield project.setHome(this.params.axis, info.home);
			}
			catch(err) {
				this.response.type = 'json';
				this.response.body = { error: true, message: err.message || err, action: err.action || 'unknown' };
			}
		},
	}
}
