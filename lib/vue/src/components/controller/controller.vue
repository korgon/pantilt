<template>
	<div class="controller-box">
		<div class="controller-wrapper">
			<div class="controller-functions">
				<div class="functions">
					<div @click="toggleControl('grid')" class="function_wrap click" title="grid display"><img class="icon" :src="gridImage"></div>
					<div @click="goHome()" class="function_wrap click" title="go home"><img class="icon" src="/images/icon_home.png"></div>
					<div @click="setHome()" class="function_wrap click" title="set home"><img class="icon" src="/images/icon_set_home.png"></div>
					<div @click="setSpeed()" class="function_wrap click" title="set speed"><img class="icon" src="/images/icon_speed.png"></div>
					<div @click="toggleControl('coordinates')" class="function_wrap"><span class="coordinates">(x, y)</span></div>
					<div class=""
				</div>
			</div>
			<div id="controller-window"></div>
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
				location: {
					x: this.axii.pan.current.position,
					y: this.axii.tilt.current.position
				},
				pan: this.axii.pan,
				tilt: this.axii.tilt,
				width: undefined,
				height: undefined,
				ratio: undefined,
				invertX: false,
				invertY: false,
				controls: {
					grid: true,
					coordinates: true
				}
			}
		},
		computed: {
			gridImage: function() {
				if (this.controls.grid) {
					return "/images/icon_grid.png";
				} else {
					return "/images/icon_grid_off.png";
				}
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
				var self = this;
				console.log('MOVING!!!!!!!!!', coordinates);
				this.pan.current.position = coordinates.x;
				this.tilt.current.position = coordinates.y;
				client.axii.move({
					pan: coordinates.x,
					tilt: coordinates.y
				}).then(function(pos) {
					self.updateLocation(pos);
				});
			},
			updateLocation: function(coordinates) {
				coordinates.x = Math.round(coordinates.x);
				coordinates.y = Math.round(coordinates.y);
				this.location = coordinates;
			},
			toggleControl: function(control) {
				if (typeof(this.controls[control]) != 'undefined') {
					this.controls[control] = !this.controls[control];
					controller.toggleThing(control, this.controls[control]);
				}
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
	.controller-box {
		&.full-screen {

		}
	}
	.controller-wrapper {
		display: flex;
		#controller-window {
			flex: 1 1;
		}
		.controller-functions {
			margin: 0 10px;
			flex: 0 0 40px;
			.click {
				cursor: pointer;
			}
			.functions {
				font-size: 10px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.function_wrap {
					text-align: center;
					flex: 1 0 100%;
					height: 30px;
					width: 30px;
					padding: 5px;
					.icon {
						width: 100%;
						height: auto;
					}
				}
			}
		}
	}
</style>
