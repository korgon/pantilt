<template>
	<div class="login-wrapper">
		<p v-if="message">{{ message }}</p>
		<input name="username" v-model="username"></input>
		<input name="password" v-model="password" type="password"></input>
		<button @click="login">login</button>
	</div>
</template>

<script>
	module.exports = {
		name: 'login',
		data: function() {
			return {
				username: undefined,
				password: undefined,
				message: 'please login'
			}
		},
		methods: {
			login: function() {
				var self = this;

				client.authenticate({ username: this.username, password: this.password }).then(function(user) {
					self.message = '...validated...';
					self.$emit('validated', user);
				}).catch(function(error) {
					self.message = 'invalid credentials';
					self.username = '';
					self.password = '';
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
