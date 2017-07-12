<template>
	<div class="header">
		<span @click="mainView" class="header-logo">
			<img class="icon" src="/images/icon.png">
			<span class="title">></span>
		</span>

		<div class="user" v-if="user">
			<span :class="{ open: showDropdown }" @click.stop="toggleDropdown()">{{ user.name.substring(0,1) }}</span>
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
			},
			mainView: function() {
				this.$emit('mainView');
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
		color: #444;

		.header-logo {
			cursor: pointer;
		}
		.icon {
			height: 4em;
			vertical-align: middle;
		}

		.title {
			vertical-align: middle;
			font-size: 2em;
			margin-left: 1rem;
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
				border: .3rem solid #1a7272;
				width: 2.6rem;
				height: 2.6rem;
				line-height: 2.6rem;
				font-size: 1.3rem;
				border-radius: 50%;
				transition: all 500ms linear;
				outline: none;
				&.open {
					border: .0325rem solid #666;
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
				box-shadow: 0 2px 4px rgba(0,0,0,.16);
				border: .0325rem solid #666;
				border-radius: 0;
				background-color: #333;
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
						background-color: #444;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>
