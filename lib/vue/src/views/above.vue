<template>
	<div class="header">
		<img class="icon" src="/images/icon.png">
		<span class="title">control</span>
		<div class="user" v-if="user">
			<span v-bind:class="{ open: showDropdown }" v-on:click="toggleDropdown($event)">{{ user.name.substring(0,1) }}</span>
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
		created: function() {
			var self = this;
			document.removeEventListener('click', documentClick);
			document.addEventListener('click', documentClick);

			function documentClick() {
				self.closeDropdown();
			}
		},
		methods: {
			toggleDropdown: function(e) {
				e && e.preventDefault;
				e && e.stopPropagation();
				this.showDropdown = !this.showDropdown;
			},
			closeDropdown: function(e) {
				e && e.preventDefault;
				e && e.stopPropagation();
				this.showDropdown = false;
			},
			logout: function() {
				client.logout();
				this.$emit('logout');
			},
			useredit: function() {
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
			height: 4em;
		}

		.title {
			font-size: 2em;
		}

		.user {
			flex: 1;
			text-align: right;
			position: relative;
			color: #8a9f9f;
			span {
				display: inline-block;
				text-align: center;
				text-transform: uppercase;
				border: .3rem solid #e0f5f5;
				width: 2.6rem;
				height: 2.6rem;
				line-height: 2.6rem;
				font-size: 1.3rem;
				border-radius: 50%;
				transition: all 500ms linear;
				outline: none;
				&.open {
					border: .0325rem solid #d0dada;
					width: 2.0rem;
					height: 2.0rem;
					line-height: 2.0rem;
					font-size: 1rem;
				}
				&:hover {
					cursor: pointer;
				}
			}
			.controls {
				display: none;
				border: .0325rem solid #d0dada;
				border-radius: 0;
				background-color: #fff;
				margin: 0;
				padding: 0;
				list-style: none;
				position: absolute;
				right: -.3rem;
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
