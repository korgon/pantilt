<template>
	<div class="controller-wrapper">
		<div id="controller-window"></div>
		<div class="controller-functions">
			Do things
			<div @click="goHome()">Go Home</div>
			<div @click="setHome()">Set Home</div>
		</div>
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
</style>
