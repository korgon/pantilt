// starting point for singleton project

// strictness!
'use strict';

// include packages
const logit = require('_/logit');
const axis = require('./axis.js');
const pan = require('./pan.js');
const tilt = require('./tilt.js');
const users = require('./user.js');

module.exports = new core();

function core() {
	let self = this;

	let options;					// object for holding config
	let axii = {
		pan: '',
		tilt: ''
	}
	let user;

	let moveInterval;

	let socketio;	// used for emitting events

	self.attachSocketIO = function(io) {
		socketio = io;
	}

	self.getOptions = function() {
		return Object.assign({}, options);
	}

	self.init = function(config) {
		options = config;

		// output version
		let title = '           ' + options.title + '           ';
		let ver = 'version [' + options.version +']';
		logit.log(title, ver, 'red');

		return users.initialize(config).then(theuser => {
			user = theuser;

			// setting up axii
			let initPromises = []
			initPromises.push(axis(pan));
			initPromises.push(axis(tilt));

			return Promise.all(initPromises);
		}).then(axi => {
			axii.pan = axi[0];
			axii.tilt = axi[1];
			return;
		}).catch(err => {
			self.debug(err);
		});
	}

	self.authenticateUser = function(details) {
		if (user.authenticate(details)) {
			logit.log('valid login', details.username + ' - from ' + details.ip, 'green');
			return true;
		} else {
			logit.log('invalid login', details.username + ' - from ' + details.ip, 'red');
			return false;
		}
	}

	self.updateUserCredentials = function(details) {
		if (user.updateCredentials(details)) {
			logit.log('modified user credentials', details.username + ' -> ' + details.newusername + ' - from ' + details.ip, 'green');
			return true;
		} else {
			logit.log('failed to modify user credentials', details.username + ' -> ' + details.newusername + ' - from ' + details.ip, 'red');
			return false;
		}
	}

	self.getUser = function() {
		return user.getUser();
	}

	self.getUserLog = function() {
		return {
			time: Date.now(),
			log: user.getLog()
		}
	}

	self.moveAxis = function(axis, location) {
		if (!axii[axis]) {
			throw new Error('move: "' + axis + '" is an invalid axis.');
		}

		return axii[axis].goTo(location, socketio).then(pos => {
			return pos;
		}).catch(err => {
			self.debug(err);
		});
	}

	self.moveAxii = function(data) {
		let movePromises = [];

		for (let axis in data) {
			console.log(axis, data[axis]);
			if (!axii[axis]) {
				throw new Error('move: "' + axis + '" is an invalid axis.');
			}
			movePromises.push(axii[axis].goTo(data[axis]));
		}

		let movePosition = {
			x: data.pan,
			y: data.tilt
		}

		socketio.socket.emit('move', movePosition);

		clearInterval(moveInterval);
		moveInterval = setInterval(() => {
			let position = {
				x: axii.pan.getCurrent().position,
				y: axii.tilt.getCurrent().position
			}

			socketio.socket.emit('moving', { at: position, to: movePosition });

			console.log('still moving...', position);
		}, 50);

		return Promise.all(movePromises).then(() => {
			console.log('MOVED THE THINGS');
			let position = {
				x: axii.pan.getCurrent().position,
				y: axii.tilt.getCurrent().position
			}

			socketio.socket.emit('moved', position);

			clearInterval(moveInterval);

			return position;
		}).catch(err => {
			console.log(err, 'all move reject!!!');
			// do nothing...
		});
	}

	self.getAxii = function() {
		let axiiPromises = [];

		for (let axis in axii) {
			axiiPromises.push(axii[axis].getAxis());
		}

		return Promise.all(axiiPromises).then(axiiData => {
			let axii = {};
			axiiData.forEach(axis => {
				axii[axis.name] = axis;
			});

			return axii;
		}).catch(err => {
			self.debug(err);
			throw err;
		});;
	}

	self.getAxis = function(axis) {
		if (!axii[axis]) {
			throw new Error('setSpeed: "' + axis + '" is an invalid axis.');
		}

		return axii[axis].getAxis();
	}

	self.getAxisCurrent = function(axis) {
		if (!axii[axis]) {
			throw new Error('setSpeed: "' + axis + '" is an invalid axis.');
		}

		return axii[axis].getCurrent();
	}

	self.setAxiiHome = function(data) {
		let homePromises = [];

		for (let axis in data) {
			if (!axii[axis]) {
				throw new Error('setAxiiHome: "' + axis + '" is an invalid axis.');
			}

			homePromises.push(axii[axis].setHome(data[axis]));
		}

		return Promise.all(homePromises).then(() => {
			var returnAxii = {};
			for (let axis in data) {
				returnAxii[axis] = axii[axis].getAxis();
			}
			let newHome = {
				x: axii.pan.getCurrent().home,
				y: axii.tilt.getCurrent().home
			}
			socketio.socket.emit('homeSet', newHome);
			return returnAxii;
		}).catch(err => {
			self.debug(err);
			throw err;
		});
	}

	self.setHome = function(axis, home) {
		if (!axii[axis]) {
			throw new Error('setHome: "' + axis + '" is an invalid axis.');
		}

		return axii[axis].setHome(home).then(() => {
			return axii[axis].getAxis();
		}).catch(err => {
			self.debug(err);
			throw err;
		});
	}

	self.setSpeed = function(axis, speed) {
		if (!axii[axis]) {
			throw new Error('setSpeed: "' + axis + '" is an invalid axis.');
		}

		return axii[axis].setSpeed(speed).then(() => {
			return axii[axis].getAxis();
		}).catch(err => {
			self.debug(err);
			throw err;
		});
	}

	self.setAxiiSpeed = function(data) {
		let speedPromises = [];

		for (let axis in data) {
			if (!axii[axis]) {
				throw new Error('setAxiiSpeed: "' + axis + '" is an invalid axis.');
			}

			speedPromises.push(axii[axis].setSpeed(data[axis]));
		}

		return Promise.all(speedPromises).then(() => {
			var returnAxii = {};
			for (let axis in data) {
				returnAxii[axis] = axii[axis].getAxis();
			}
			return returnAxii;
		}).catch(err => {
			self.debug(err);
			throw err;
		});;
	}

	self.debug = function(debug) {
		if (options.debug) {
			if (typeof debug == 'string') {
				logit.log({ alert: 'debug', color: 'grey', message: debug });
			} else if (typeof debug == 'function') {
				debug();
			}
		}
	}
}
