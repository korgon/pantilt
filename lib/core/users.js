// user functionality
// initialize creates file listed in config: user_config
//
// change password
// change username
// login
// log date/time, ip address

"use strict";

const fspro = require('_/fspro');

function User() {
	let self = this;
	let saveFile;
	let username, password;
	let log = [];

	let defaultConfig = {
		username: 'admin',
		password: 'admin',
		log
	}

	self.save = function() {
		return fspro.putJSON(saveFile, {
			username,
			password,
			log
		});
	}

	self.authenticate = function(un, pw, ip) {
		if (un == username && pw == password) {
			updateLog('login: from ' + ip);
			self.save();
			return true;
		} else {
			return false;
		}
	}

	self.getLog = function() {
		return log;
	}

	self.updateCredentials = function(un, pw, ip) {
		username = un;
		password = pw;

		updateLog('changed authentication credentials');

		return self.save();
	}

	let updateLog = function(line) {
		let now = new Date();
		let time = now.toLocaleString();
		log.push(time + ' - ' + line);
	}

	self.initialize = function(config) {
		if (!config || !config.user_config) {
			throw new Error('Invalid Configuration!');
		}

		saveFile = config.user_config;
		// load from file or create new file
		return fspro.exists(saveFile).then(stats => {
			if (stats) {
				// load last state json
				return fspro.getJSON(saveFile).then(data => {
					username = data.username;
					password = data.password;
					log = data.log;
					return Promise.resolve();
				});
			} else {
				return fspro.putJSON(saveFile, defaultConfig);
			}
		}).then(() => {
			return self;
		}).catch(err => {
			throw err;
		});
	}
}

module.exports = new User;
