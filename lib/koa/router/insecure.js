var router = require('koa-router')();
var koaBody = require('koa-better-body');

module.exports = function(project) {
	// begin route definitions

	// api routes
	var api = require('./api.js')(project);

	// login
	router.post('/login', koaBody(), api.login);

	return router;
}
