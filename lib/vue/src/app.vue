<template>
	<div id="main" class="box" v-cloak>
		<header id="above" class="box">
			<above :user="user" @logout="logout" @useredit="changeView('user')"></above>
		</header>

		<div id="center" class="box">
			<main id="content">
				<component
					:is="currentView"
					@validated="validated"
					@previousView="changeView(previousView)"
					:user="user"
					:axii="axii">
				</component>
			</main>
		</div>

		<footer id="below" class="box">
			<below></below>
		</footer>
	</div>
</template>

<script>
	// components
	var above = require('./views/above.vue');
	var below = require('./views/below.vue');
	var login = require('./views/login.vue');
	var control = require('./views/control.vue');
	var user = require('./views/user.vue');

	module.exports = {
		name: 'app',
		components: {
			above,
			below,
			login,
			control,
			user
		},
		data: function() {
			return {
				previousView: undefined,
				currentView: undefined,
				axii: undefined,
				views: ['login', 'control', 'user']
			}
		},
		created: function() {
			var self = this;
			client.authenticate().then(function(user) {
				self.validated(user);
			}).catch(function(err) {
				self.logout();
			});
		},
		methods: {
			validated: function(user) {
				var self = this;

				this.user = user;

				client.init().then(function(axii) {
					self.axii = axii;
					self.changeView('control');
				}).catch(function(err) {
					console.error('client init failed! ', err);
				});
			},
			logout: function() {
				this.user = client.logout();;
				this.changeView('login');
			},
			changeView: function(view) {
				if (this.views.indexOf(view) != -1) {
					if (this.previousView != this.currentView && view != this.currentView) {
						this.previousView = this.currentView;
					}
					this.currentView = view;
				}
			}
		}
	}
</script>

<style lang="scss">
	@import 'scss/_frame.scss';

	body {
		margin: 0;
		color: #8a9f9f;
	}

	#main {
		display: flex;
		min-height: 100vh;
		flex-direction: column;

		#above {

		}

		#center {
			display: flex;
			flex-direction: column;
			flex: 1;
			#content {

			}
		}

		#below {

		}
	}

	@include respond(768) {
		#main {
			#center {
				flex: 1;
				flex-direction: row;

				#content {
					flex: 1;
				}
			}
		}
	}
</style>
