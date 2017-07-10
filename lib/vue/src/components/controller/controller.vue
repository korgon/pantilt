<template>
	<div class="controller-box">
		<div class="controller-wrapper">
			<div class="controller-functions">
				<div class="functions">
					<div class="function">
						<div @click="toggleControl('grid')" class="function_wrap" title="grid display"><img class="icon" :src="gridImage"></div>
					</div>

					<div class="function">
						<div @click="goHome()" class="function_wrap" title="go home"><img class="icon" src="/images/icon_home.png"></div>
					</div>

					<div class="function">
						<div @click="setHome()" class="function_wrap" title="set home"><img class="icon" src="/images/icon_set_home.png"></div>
					</div>

					<div class="function">
						<div @click="toggleControlMenu('speed')" class="function_wrap" title="set speed" v-bind:class="{ open: controls.menus.speed }">
							<img class="icon" src="/images/icon_speed.png">
							<div class="function_wrap__container slider" v-show="controls.menus.speed" @click.stop>
								<slider @changed="setSpeed" :position="pan.current.speed" :min="pan.speed.min" :max="pan.speed.max"></slider>
							</div>
						</div>
					</div>

					<div class="function">
						<div @click="toggleControl('coordinates')" class="function_wrap"><span class="coordinates">(x, y)</span></div>
					</div>
				</div>
			</div>

			<div id="controller-window"></div>
		</div>
	</div>
</template>

<script>
	// main scripting
	var controller = require('./controller.js');

	// components
	var slider = require('./slider.vue');

	module.exports = {
		name: 'controller',
		components: {
			slider
		},
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
					coordinates: true,
					menus: {
						speed: false
					}
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
			toggleControlMenu: function(menu) {
				this.controls.menus[menu] = !this.controls.menus[menu];
			},
			goHome: function() {
				this.move({ x: this.pan.current.home, y: this.tilt.current.home });
			},
			setSpeed: function(value) {
				var self = this;

				client.axii.setSpeed({
					pan: value,
					tilt: value
				}).then(function(axii) {
					self.pan.current.speed = axii.pan.current.speed;
					self.tilt.current.speed = axii.tilt.current.speed;
				});
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
			},
			syncAxiiPosition: function(loc) {
				this.pan.current.position = loc.x;
				this.tilt.current.position = loc.y;
			},
			syncAxiiHome: function(loc) {
				this.pan.current.home = loc.x;
				this.tilt.current.home = loc.y;
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
			z-index: 1;
		}
		.controller-functions {
			margin: 0 10px;
			flex: 0 0 40px;
			z-index: 3;
			.functions {
				font-size: 10px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				.function {
					position: relative;
					flex: 1 0 100%;
					height: 30px;
					width: 30px;
					line-height: 30px;
					padding: 5px;
					.function_wrap {
						text-align: center;
						&.open {
							display: flex;
							justify-content: center;
							align-items: center;
							position: absolute;
							overflow: hidden;
							height: 40px;
							top: 0;
							left: 0;
							padding-left: 5px;
							border-radius: 40px;
							background-color: #333;
							box-shadow: 0 2px 4px rgba(0,0,0,.16);
						}
						.icon {
							display: inline-block;
							width: 30px;
							height: auto;
							max-height: 100%;
						}

						.function_wrap__container {
							display: inline-block;
							background-color: #333;
							&.slider {
								width: 150px;
								padding-right: 20px;
							}
						}
					}
				}
			}
		}
	}
</style>
