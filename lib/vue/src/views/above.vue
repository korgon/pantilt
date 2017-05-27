<template>
	<div class="header">
		<img class="icon" src="/images/icon.png">
		<span class="title">control</span>
		<div class="user" v-if="user">
			<span v-bind:class="{ open: showDropdown }" v-on:click="toggleDropdown($event)">{{ user.name.substring(0) }}</span>
			<ul class="controls" v-bind:class="{ open: showDropdown }">
				<li @click="useredit">settings</li>
				<li @click="logout">logout</li>
			</ul>
		</div>
	</div>
</template>

<script>
	module.exports = {
		name: 'above',
		props: ['user'],
		data: function() {
			return {
				showDropdown: false
			}
		},
		methods: {
			toggleDropdown: function(e) {
				e && e.preventDefault;
				e && e.stopPropagation();
				this.showDropdown = !this.showDropdown;
			},
			closeDropdown: function(e) {
				console.log('closing dropdown');
				e && e.preventDefault;
				e && e.stopPropagation();
				console.log(e);
				this.showDropdown = false;
			},
			logout: function() {
				this.closeDropdown();
				client.logout();
				this.$emit('logout');
			},
			useredit: function() {
				this.closeDropdown();
				this.$emit('useredit')
			}
		}
	}
</script>

<style lang="scss">
	.header {
		display: flex;
		justify-content: left;
		align-content: center;
		align-items: center;
		color: #8a9f9f;

		.icon {
			height: 6em;
		}

		.title {
			font-size: 3em;
		}

		.user {
			flex: 1;
			text-align: right;
			position: relative;
			color: #8a9f9f;
			span {
				display: inline-block;
				width: 2.6rem;
				height: 2.6rem;
				text-align: center;
				line-height: 2.6rem;
				font-size: 1.3rem;
				text-transform: uppercase;
				border: .3rem solid #e0f5f5;
				border-radius: 50%;
				transition: border-radius 500ms linear;
				outline: none;
				&.open {
					border-radius: 0;
				}
				&:hover {
					cursor: pointer;
				}
			}
			.controls {
				display: none;
				border: .0325rem solid #d0dada;
				background-color: #fff;
				margin: 0;
				padding: 0;
				list-style: none;
				position: absolute;
				right: 0;
				text-align: center;
				top: 3.2rem;
				z-index: 3;
				width: 9rem;
				&.open {
					display: block;
				}
				li {
					padding: 7px;
					&:hover {
						background-color: #e0f5f5;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>
