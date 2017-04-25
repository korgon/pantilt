<template>
	<div class="login-wrapper">
		<p v-if="message">{{ message }}</p>
		<input name="username" v-model="username"></input>
		<input name="password" v-model="password"></input>
		<button @click="login">login</button>
	</div>
</template>

<script>
	var axios = require('axios');

	module.exports = {
		name: 'login',
		data: function() {
			return {
				username: undefined,
				password: undefined,
				message: 'please login'
			}
		},
		created: function() {
		},
		methods: {
			login: function() {
				var self = this;
				this.message = '...authenticating...';

				// TODO ajax login
				// set user
				// save jwt into localstorage
				client.authenticate({ username: this.username, password: this.password }).then(function(user) {
					console.log(user);
					self.$emit('validated', user);
				}).catch(function(error) {
					this.message = 'INVALID CREDENTIALS';
					this.username = '';
					this.password = '';
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
