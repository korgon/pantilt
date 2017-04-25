var router = require('koa-router')();
var koaBody = require('koa-better-body');

module.exports = function(project) {
	// begin route definitions

	// api routes
	var api = require('./api.js')(project);

	// examples of post/get routes
	// router.post('/post/route/path', koaBody(), api.dealPost);
	// router.get('/get/route/path', api.dealGet);

	router.get('/api/axis', api.getAxii);
	router.get('/api/axis/:axis', api.getAxis);
	router.get('/api/axis/:axis/current', api.getAxisCurrent);

	// get user details
	router.get('/api/user', api.getUser);

	// set speed
	router.post('/api/axis/:axis/speed', koaBody(), api.setSpeed);

	// set home
	router.post('/api/axis/:axis/home', koaBody(), api.setHome);

	// end route definitions
	return router;
}