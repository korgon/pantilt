<template>
	<div>
		<div class="credential-inputs">
			<h4>Change Credentials</h4>
			<p v-if="message">{{ message }}</p>
			<div>
				<label>username</label>
				<input @keyup="checkInputs()" name="username" v-model="username" type="text"></input>
			</div>

			<div>
				<label>current password</label>
				<input @keyup="checkInputs()" name="password" v-model="password" type="password"></input>
			</div>

			<div>
				<label>new password</label>
				<input @keyup="checkInputs()" name="newpassword" v-model="newpassword" type="password"></input>
			</div>

			<div>
				<label>new password</label>
				<input @keyup="checkInputs()" name="verification" v-model="verification" type="password"></input>
			</div>

			<div>
				<button :disabled="!validated" @click="save()">Save</button>
				<button @click="back()">Back</button>
			</div>
		</div>

		<div v-if="log.length">
			<h4>Access Log</h4>
			<table class="access-log">
				<tr class="heading">
					<th>Date</th>
					<th>Entry</th>
					<th>IP</th>
				</tr>
				<tr v-for="entry in log">
					<td>{{ entry.time }}</td>
					<td :class="'level-' + entry.level">{{ entry.message }}</td>
					<td>{{ entry.ip }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	module.exports = {
		name: 'user',
		props: ['user'],
		data: function() {
			return {
				username: client.user.name,
				password: undefined,
				newpassword: undefined,
				verification: undefined,
				message: undefined,
				validated: false,
				rawlog: []
			}
		},
		computed: {
			log: function() {
				return this.rawlog.map(function(entry) {
					entry.time = 'unknown';
					if (entry.datetime) {
						let date = new Date(entry.datetime);
						entry.time = date.toLocaleString({} ,{ hour12:false });
					}

					return entry;
				});
			}
		},
		created: function() {
			var self = this;

			client.user.getLog().then(function(data) {
				self.rawlog = data
			});
		},
		methods: {
			checkInputs: function() {
				if (this.username && this.password && this.newpassword, this.verification) {
					if (this.newpassword != this.verification) {
						this.validated = false;
					} else {
						this.validated = true;
					}
				} else {
					this.validated = false;
				}
			},
			resetInputs: function() {
				this.password = undefined;
				this.newpassword = undefined;
				this.verification = undefined;
			},
			save: function() {
				var self = this;

				client.user.updateCredentials({
					username: client.user.name,
					password: this.password,
					newpassword: this.newpassword,
					newusername: this.username
				}).then(function(resp) {
					console.log('resp', resp);
					if (resp.message == 'success') {
						self.$emit('logout');
					} else {
						self.message = resp.message;
						self.resetInputs();
					}
				});
			},
			back: function() {
				this.$emit('previousView');
			}
		}
	}
</script>

<style lang="scss">
	.credential-inputs {
		input, label {
			display: block;
		}
	}
	.access-log {
		border-spacing: 3px;
		border-collapse: collapse;
		.heading {
			border-bottom: 1px solid #ddd;
		}
		th, td {
			padding: 4px 9px;
		}
		th {
			text-align: left;
		}
		td {
			&.level-low {
				color: #41d241;
			}
			&.level-medium {
				color: #b98f42;
			}
			&.level-high {
				color: #ec4e4e;
			}
		}
	}
</style>
