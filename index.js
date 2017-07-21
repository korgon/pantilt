"use strict";

let conf = require('_/config')(__dirname);
let core = require('_/core');

core.init(conf).then(function() {
	let app = require('_/app')(core);
}).catch(function(err) {
	console.log('failed to initialize!');
	console.log(err);
	process.exit(1);
});
