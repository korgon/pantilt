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

	self.authenticate = function(details) {
		if (details.username == username && details.password == password) {
			updateLog({
				message: 'user logged in',
				ip: details.ip,
				level: 'low'
			});
			self.save();
			return true;
		} else {
			updateLog({
				message: 'failed login attempt',
				details: details.username,
				ip: details.ip,
				level: 'high'
			});
			return false;
		}
	}

	self.getLog = function() {
		return log;
	}

	self.getUser = function() {
		// get last 'login'
		let lastLogin;

		for (let i = log.length - 1; i >= 0; i--) {
			if (log[i].message.match(/user logged in/)) {
				lastLogin = log[i].time;
				break;
			}
		}

		return {
			name: username,
			lastLogin: lastLogin ? lastLogin : 'no record'
		}
	}

	self.updateCredentials = function(details) {
		if (details.username == username && details.password == password) {
			username = details.newusername;
			password = details.newpassword;

			updateLog({
				message: 'updated authentication credentials',
				ip: details.ip,
				level: 'medium'
			});

			self.save();
			return true;
		} else {
			updateLog({
				message: 'failed authentication credentials update',
				details: details.username + ' -> ' + details.newusername,
				ip: details.ip,
				level: 'high'
			});
			return false;
		}
	}

	let updateLog = function(entry) {
		entry.datetime = Date.now();
		log.push(entry);
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
				username = defaultConfig.username;
				password = defaultConfig.password;
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
