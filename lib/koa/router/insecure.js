var fs = require('fs');
var router = require('koa-router')();
var koaBody = require('koa-better-body');
var jwt = require('koa-jwt');

// rsa keys
var publicKey = fs.readFileSync(__dirname + '/../keys/panny.rsa.pub');
var privateKey = fs.readFileSync(__dirname + '/../keys/panny.rsa');

module.exports = function(project) {
	// begin route definitions

	// login
	router.post('/login', koaBody(), function *(next) {
		var claims = this.request.fields;

		// TODO verify claims...

		var token = jwt.sign(claims, privateKey, { algorithm: 'RS256' });

		// do some login logging here...

		this.status = 200;
		this.body = { token: token };
	});

	return router;
}
