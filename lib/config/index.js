// settings

module.exports = function(dir) {
	return {
		title: 'pantilt',
		version: '0.0.1',
		app_dir: dir,
		koa_port: 8000,
		app_log_http: true,
		user_config: 'lib/config/user.json',
		debug: true
	}
}
