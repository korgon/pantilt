<template>
	<div class="controller-wrapper">
		<div id="controller-window"></div>
		<div class="controller-functions">

		</div>
	</div>
</template>

<script>
	/*
		New ideas...
		Don't use range slider use konva for better accuracy in drawings...
	*/

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

			// socket.io events
			client.socket.on('move', function(data) {
				console.log('socket triggered: move', data);
				controller.moveIndicator(data.x, data.y);
			});

			client.socket.on('moved', function(data) {
				console.log('socket triggered: moved', data);
				controller.alignShadow();
			});

			client.socket.on('moving', function(data) {
				console.log('socket triggered: moving', data);
				if (data.x && data.y) {
					controller.moveShadow(data.x, data.y);
				}
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
			}
		},
		destroyed: function() {
			controller.unload();
		}
	}
</script>

<style lang="scss">
</style>
