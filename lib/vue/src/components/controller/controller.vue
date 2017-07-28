<template>
	<div class="controller-box" v-bind:class="{ 'full-screen': controls.fullscreen }">
		<div class="controller-wrapper">
			<div class="controller-functions">
				<div class="functions">
					<div class="function">
						<div @click="toggleControl('coordinates')" class="function_wrap" title="coordinates"><img class="icon" :src="coordinatesImage"></div>
					</div>

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
						<div @click.stop="toggleControlMenu('speed')" class="function_wrap" title="set speed" v-bind:class="{ open: controls.menus.speed }">
							<img class="icon" src="/images/icon_speed.png">
							<div class="function_wrap__container slider" @click.stop>
								<slider @changed="setSpeed" :position="pan.current.speed" :min="pan.speed.min" :max="pan.speed.max"></slider>
							</div>
						</div>
					</div>

					<div class="function">
						<div @click="toggleControl('fullscreen'); resize();" class="function_wrap" title="fullscreen"><img class="icon" src="/images/icon_fullscreen.png"></div>
					</div>
				</div>
			</div>

			<div class="controller-window" v-bind:style="sizeStyle">
				<div id="controller-overlay"></div>
				<div id="controller-display"></div>
			</div>
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
					fullscreen: false,
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
			},
			coordinatesImage: function() {
				if (this.controls.coordinates) {
					return "/images/icon_coordinates.png";
				} else {
					return "/images/icon_coordinates_off.png";
				}
			},
			sizeStyle: function() {
				return {
					height: this.height + 'px',
					width: this.width + 'px'
				}
			}
		},
		created: function() {
			var self = this;

			// closeMenus on page clicks
			function documentClick() {
				self.toggleControlMenu();
			}

			var redrawResize = debounce(function() {
				resizeController();
				// controller.redraw();
				controller.resize();
			}, 10);

			// remove event listeners on recreation
			document.removeEventListener('click', documentClick);
			document.addEventListener('click', documentClick);
			window.removeEventListener('resize', redrawResize);
			window.addEventListener('resize', redrawResize);

			// adjust variables when window is resized
			function resizeController() {
				// need to do some debouncing or something... this is killing performance...
				var grid = document.getElementById('controller-overlay');

				if (grid) {
					self.width = grid && Math.floor(grid.getBoundingClientRect().width);

					self.startWidth = self.startWidth || self.width;

					// calculate ratio to determine height of grid
					var panRange = self.pan.bounds.range;
					var tiltRange = self.tilt.bounds.range;
					self.ratio = self.startWidth / panRange;

					self.height = tiltRange * (self.width / panRange);
				}
			}

			function debounce(func, wait, immediate) {
				var timeout;
				return function() {
					var context = this, args = arguments;
					var later = function() {
						timeout = null;
						if (!immediate) func.apply(context, args);
					};
					var callNow = immediate && !timeout;
					clearTimeout(timeout);
					timeout = setTimeout(later, wait);
					if (callNow) func.apply(context, args);
				};
			}

			setTimeout(function() {
				controller.initialize(self);
				resizeController();
			});
		},
		methods: {
			resize: function() {
				setTimeout(function() {
					window.dispatchEvent(new Event('resize'));
				});
			},
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
				if (menu && typeof(this.controls.menus[menu]) != 'undefined') {
					this.controls.menus[menu] = !this.controls.menus[menu];
				} else {
					for (menu in this.controls.menus) {
						this.controls.menus[menu] = false;
					}
				}
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
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			.controller-functions {
				position: absolute;
				top: 0;
				left: 0;
			}
		}
	}
	.controller-wrapper {
		position: relative;
		display: flex;

		.controller-window {
			flex: 1 1;
			z-index: 1;
			position: relative;
			#controller-overlay, #controller-display {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
			}
			#controller-overlay {
				z-index: 2;
				opacity: 1;
			}
			#controller-display {
				z-index: 1;
				// background: url('/images/background.jpg') no-repeat;
				// background-size: 100%;
				background-color: #222;
			}
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
						display: flex;
						justify-content: flex-start;
						align-items: center;
						position: absolute;
						overflow: hidden;
						height: 40px;
						max-width: 40px;
						border-radius: 40px;
						top: 0;
						left: 0;
						transition: max-width 0.3s ease;

						&.open {
							max-width: 300px;
							box-shadow: 0 2px 4px rgba(0,0,0,.16);
							background-color: #333;
							transition: max-width 1s ease;

							.icon {
								opacity: 1;
							}

							.function_wrap__container {
								opacity: 1;
								transition: width 0.6s ease;
								&.slider {
									width: 150px;
								}
							}
						}

						&:hover {
							.icon {
								opacity: 1;
							}
						}

						.icon {
							display: inline-block;
							width: 30px;
							height: auto;
							max-height: 100%;
							margin: 5px;
							opacity: 0.5;
						}

						.function_wrap__container {
							display: inline-block;
							opacity: 0.3;
							width: 0;
							padding: 0 20px 0 10px;
							transition: width 0.6s ease;
						}
					}
				}
			}
		}
	}
</style>
