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

	self.move = function(axis, location) {
		if (!axii[axis]) {
			throw new Error('move: "' + axis + '" is an invalid axis.');
		}

		return axii[axis].goTo(location).then(pos => {
			return pos;
		}).catch(err => {
			self.debug(err);
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
