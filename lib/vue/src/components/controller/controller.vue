<template>
	<div class="controller-wrapper">
		<div class="controller-functions">
			<div @click="goHome()" class="icon_wrap click" title="go home"><img class="icon" src="/images/icon_home.png"></div>
			<div @click="setHome()" class="icon_wrap click" title="set home"><img class="icon" src="/images/icon_set_home.png"></div>
			<div class="icon_wrap"><img class="icon" src="/images/icon_speed.png"></div>
		</div>
		<div id="controller-window"></div>
	</div>
</template>

<script>
	var controller = require('./controller.js');

	module.exports = {
		name: 'controller',
		props: ['axii'],
		data: function() {
			return {
				pan: this.axii.pan,
				tilt: this.axii.tilt,
				width: undefined,
				height: undefined,
				ratio: undefined,
				invertX: false,
				invertY: false
			}
		},
		created: function() {
			var self = this;

			// adjust variables when window is resized
			window.removeEventListener('resize', resizeController);
			window.addEventListener('resize', resizeController);

			function resizeController() {
				var grid = document.getElementById('controller-window');

				if (grid) {
					self.width = grid && Math.floor(grid.getBoundingClientRect().width);

					// calculate ratio to determine height of grid
					var panRange = self.pan.bounds.range;
					var tiltRange = self.tilt.bounds.range;
					self.ratio = self.width / panRange;
					console.log('ratio:', self.ratio);

					self.height = tiltRange * self.ratio;

					console.log('resize:', self.width);
					controller.initialize(self);
				}
			}

			setTimeout(function() {
				resizeController();
			});
		},
		methods: {
			move: function(coordinates) {
				console.log('MOVING!!!!!!!!!', coordinates);
				this.pan.current.position = coordinates.x;
				this.tilt.current.position = coordinates.y;
				client.axii.move({
					pan: coordinates.x,
					tilt: coordinates.y
				});
			},
			goHome: function() {
				this.move({ x: this.pan.current.home, y: this.tilt.current.home });
			},
			setHome: function() {
				var self = this;

				client.axii.setHome({
					pan: this.pan.current.position,
					tilt: this.tilt.current.position
				}).then(function(axii) {
					self.pan.current.home = axii.pan.current.home;
					self.tilt.current.home = axii.tilt.current.home;
					controller.moveThing('home', {
						x: self.pan.current.home,
						y: self.tilt.current.home
					});
				});
			}
		},
		destroyed: function() {
			controller.unload();
		}
	}
</script>

<style lang="scss">
	.controller-wrapper {
		display: flex;
		#controller-window {
			flex: 1 1;
		}
		.controller-functions {
			margin: 0 10px;
			flex: 0 2 40px;
			.click {
				cursor: pointer;
			}
			.icon_wrap {
				padding: 5px;
				.icon {
					width: 100%;
					height: auto;
				}
			}
		}
	}
</style>
