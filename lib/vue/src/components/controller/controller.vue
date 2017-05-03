<template>
	<div class="controller-wrapper">
		<div class="controller-left">
			<div class="controller-grid-wrapper"><grid :axii="axii" :ratio="ratio" :width="width" :height="height" :wrapperWidth="wrapperWidth"></grid></div>
			<div class="controller-slider-horizontal"><slider :axis="pan" @move="moveAxis"></slider></div>
		</div>
		<div class="controller-right">
			<div class="controller-slider-vertical"><slider :axis="tilt" @move="moveAxis" :width="width" :height="height" :wrapperWidth="wrapperWidth"></slider></div>
		</div>
	</div>
</template>

<script>
	// components
	var slider = require('./slider.vue');
	var grid = require('./grid.vue');

	/*
		New ideas...
		Don't use canvas library; instead use a div
		use range slider for precision control
	*/

	module.exports = {
		name: 'controller',
		components: {
			grid,
			slider
		},
		props: ['axii'],
		data: function() {
			return {
				pan: this.axii.pan,
				tilt: this.axii.tilt,
				width: undefined,
				height: undefined,
				wrapperWidth: undefined,
				ratio: undefined
			}
		},
		created: function() {
			var self = this;

			setTimeout(function() {
				resizeController();
			});

			window.addEventListener('resize', resizeController);

			function resizeController() {
				var grid = document.querySelector('.controller-grid');
				var controllerWrap = document.querySelector('.controller-wrapper');

				self.width = grid && Math.floor(grid.getBoundingClientRect().width);
				self.wrapperWidth = controllerWrap && Math.floor(controllerWrap.getBoundingClientRect().width);

				// calculate ratio to determine height of grid
				var panRange = self.axii.pan.bounds.range;
				var tiltRange = self.axii.tilt.bounds.range;
				self.ratio = self.width / panRange;
				console.log('ratio:', self.ratio);

				self.height = tiltRange * self.ratio;
			}
		},
		methods: {
			moveAxis: function(axis) {
				console.log('MOVING', axis);
				this.axii[axis.name].current.position = axis.position;
			}
		}
	}
</script>

<style lang="scss">
	.controller-wrapper {
		display: flex;
	}

	.controller-left {
		flex: 3 0;
		.controller-slider-horizontal {
			margin-top: 10px;
		}
	}

	.controller-right {
		flex: 0 0 40px;
		.controller-slider-vertical {
			position: relative;
			height: 100%;
		}
	}

	.controller-grid-wrapper {
		
	}
</style>
