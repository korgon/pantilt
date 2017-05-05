var Vue = require('vue');
var App = require('./app.vue');

window.konva = require('konva');
window.client = require('./client/');

var vm = new Vue({
	el: '#app',
	render: function(create) {
		return create(App);
	}
});
