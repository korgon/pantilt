<template>
	<div id="controller-window"></div>
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

				self.width = grid && Math.floor(grid.getBoundingClientRect().width);

				// calculate ratio to determine height of grid
				var panRange = self.axii.pan.bounds.range;
				var tiltRange = self.axii.tilt.bounds.range;
				self.ratio = self.width / panRange;
				console.log('ratio:', self.ratio);

				self.height = tiltRange * self.ratio;

				controller.resizeStage(self.width);
			}

			setTimeout(function() {
				resizeController();
				controller.initialize(self);
			});
		},
		methods: {
			move: function() {
				console.log('MOVING!!!!!!!!!');
			}
		},
		destroyed: function() {
			controller.unload();
		}
	}
</script>

<style lang="scss">
	#controller-window {

	}
</style>
