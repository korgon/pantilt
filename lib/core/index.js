// starting point for singleton project

// strictness!
'use strict';

// include packages
const logit = require('_/logit');
const axis = require('./axis.js');
const pan = require('./pan.js');
const tilt = require('./tilt.js');

module.exports = new core();

function core() {
	let self = this;

	let options;					// object for holding config
	let axii = {
		pan: '',
		tilt: ''
	}

	self.getOptions = function() {
		return Object.assign({}, options);
	}

	self.init = function(config) {
		return new Promise(function(resolve, reject) {
			options = config;

			// output version
			let title = '           ' + options.title + '           ';
			let ver = 'version [' + options.version +']';
			logit.log(title, ver, 'red');

			// setting up axii
			let initPromises = []
			initPromises.push(axis(pan));
			initPromises.push(axis(tilt));
			return Promise.all(initPromises).then(axi => {
				axii.pan = axi[0];
				axii.tilt = axi[1];
				return resolve();
			}).catch(err => {
				self.debug(err);
			});
		});
	}

	self.moveAxis = function(axis, location) {
		if (!axii[axis]) {
			throw new Error('move: "' + axis + '" is an invalid axis.');
		}

		return axii[axis].goTo(location).then(pos => {
			return pos;
		}).catch(err => {
			self.debug(err);
		});
	}

	self.getAxii = function() {
		let axiiPromises = [];

		for (let axis in axii) {
			axiiPromises.push(axii[axis].getState());
		}

		return Promise.all(axiiPromises).then(axiiData => {
			let axii = {};
			axiiData.forEach(axis => {
				axii[axis.name] = axis;
			});

			return axii;
		});
	}

	self.getAxis = function(axis) {
		if (!axii[axis]) {
			throw new Error('setSpeed: "' + axis + '" is an invalid axis.');
		}

		return axii[axis].getState();
	}

	self.getAxisCurrent = function(axis) {
		if (!axii[axis]) {
			throw new Error('setSpeed: "' + axis + '" is an invalid axis.');
		}

		return axii[axis].getCurrent();
	}

	self.setSpeed = function(axis, speed) {
		if (!axii[axis]) {
			throw new Error('setSpeed: "' + axis + '" is an invalid axis.');
		}

		return axii[axis].setSpeed(speed).then(() => {
			return axii[axis].getCurrent();
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
			return axii[axis].getCurrent();
		}).catch(err => {
			self.debug(err);
			throw err;
		});
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
