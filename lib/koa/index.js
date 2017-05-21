// springboard koa
// manage searchspring sites

// strictness!
"use strict";

// include packages
const fs = require('fs');
const path = require('path');
const koa = require('koa');
const jwt = require('koa-jwt');
const koaBody = require('koa-better-body');
const favicon = require('koa-favicon');
const logger = require('koa-logger');
const serve = require('koa-static');
const IO = require('koa-socket');
const socketioJwt = require('socketio-jwt');

const logit = require('_/logit');

// rsa keys
var publicKey = fs.readFileSync(__dirname + '/keys/panny.rsa.pub');
var privateKey = fs.readFileSync(__dirname + '/keys/panny.rsa');

module.exports = function(project) {
	// start
	let options = project.getOptions();
	//console.log(options);

	let app = koa();
	let io = new IO();

	// handle things... sample middleware
	// app.use(function*(next) {
	//   try {
	//     // pass things downstream
	//     yield next;
	//   } catch(err) {
	//     // catch any errors thrown upstream
	//     this.status == err.status || 500
	//   }
	// });

	// optional middleware
	// ------------------------------------

	// 404 middleware
	app.use(function *error404(next) {
		yield next;

		if (404 != this.status) return;

		// explicitly set 404 here
		this.status = 404;
		let filename = __dirname + '/public/404.html';
		let stats = fs.statSync(filename);
		this.set('Last-Modified', stats.mtime.toUTCString());
		this.set('Content-Length', stats.size);
		this.set('Cache-Control', 'max-age=0');
		this.type = path.extname(filename);
		this.body = fs.createReadStream(filename);
	});

	// static content
	app.use(favicon(__dirname + '/public/images/favicon.png'));
	app.use(serve(__dirname + '/public/'));


	// insecure route middleware
	// ----------------
	let insecure = require('./router/insecure.js')(project);
	app.use(insecure.routes());

	// check for token
	app.use(function *(next) {
		try {
			yield next; // attempt to go through the JWT validator
		} catch(e) {
			if (e.status == 401 ) {
				// prepare response to user.
				this.status = e.status;
				this.body = 'You don\'t have a signed token dude :('
			} else {
				throw e; // Pass the error to the next handler since it wasn't a JWT error.
			}
		}
	});

	// Middleware below this line is only reached if JWT token is valid
	app.use(jwt({
		secret: publicKey,
		algorithm: 'RS256'
	}));

	// jwt middleware to attach user data based on token
	app.use(function *(next) {
		let token = this.request.header.authorization;
		if (token) {
			token = token.replace('Bearer ', '');

			this.user = jwt.verify(token, publicKey, { algorithms: 'RS256' });
		}

		yield next;
	});

	// jwt protected middleware
	let secure = require('./router/secure.js')(project);
	app.use(secure.routes());


	// log HTTP
	if (options.app_log_http) {
		app.use(logger());
	}

	// websockets
	// ----------------
	io.attach(app);

	const socketioJwtAuthorize = socketioJwt.authorize({
		secret: publicKey,
		handshake: true
	});

	io.use(async(ctx, next) => {
		console.log('first io middleware');
		try {
			await next();
		} catch(err) {
			console.log(error);
		}
	});

	io.use(async(ctx, next) => {
		console.log('first io middleware');

		const handshake = ctx.socket.socket.handshake;

		// console.log('handshake', handshake);
		socketioJwtAuthorize(handshake, (_, success) => {
			console.log('here???');
			if (success) {
				// console.log(ctx.socket.socket);
				ctx.socket.socket.payload = handshake.decoded_token
				next();
			} else {
				console.log("Websocket auth attempt failed")
			}
		});
	});

	io.on('connection', function(ctx, data) {
		const username = ctx.socket.payload;
		console.log(username, 'connected');
	});

	io.on('test', function(ctx, data) {
		if (ctx.socket.socket.payload && ctx.socket.socket.payload.username) {
			const username = ctx.socket.socket.payload.username;
			console.log(username);
			if (username) {
				console.log('You can do the test!')
			} else {
				console.log('unauthenticated attempt!')
			}
		}
	});

	project.io = app.io;	// is this legit?

	// start your engines
	app.listen(options.koa_port);
	project.debug('http server is listening on ' + options.koa_port);
}
