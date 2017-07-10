<template>
	<input type="range" v-model="sliderPosition" :min="min" :max="max" class="controller-slider">
</template>

<script>
	module.exports = {
		name: 'slider',
		props: ['max', 'min', 'position'],
		data: function() {
			return {
				sliderPosition: this.position,
				lastPosition: undefined,
				watchTimer: undefined
			}
		},
		computed: {
		},
		created: function() {
			// do things after creation
		},
		watch: {
			sliderPosition: function() {
				// only emit move event after position has stabilized
				var self = this;
				var waitTime = 150;

				if (!self.watchTimer) {
					self.lastPosition = self.sliderPosition;
				}

				this.watchTimer = this.watchTimer || setInterval(function() {
					if (self.sliderPosition == self.lastPosition) {
						self.$emit('changed', self.sliderPosition);
						clearInterval(self.watchTimer);
						self.watchTimer = undefined;
					} else {
						self.lastPosition = self.sliderPosition;
					}
				}, waitTime);
			}
		}
	}
</script>

<style lang="scss">
	$slider_width: 100%;
	$slider_background_color: #333;
	$slider_bar_color: #222;
	$slider_bar_focus_color: #222;
	$slider_bar_border_radius: 3px;
	$slider_bar_height: 6px;
	$slider_cursor_color: #289797;
	$slider_cursor_size: 16px;
	$slider_cursor_border_radius: 50%;

	.controller-slider {
		box-sizing: border-box;
		-webkit-appearance: none;
		width: $slider_width;
		background-color: $slider_background_color;
		// ff fix
		// border: 1px solid $slider_bar_color;

		// track
		&::-webkit-slider-runnable-track {
			width: $slider_width;
			height: $slider_bar_height;
			background: $slider_bar_color;
			border: none;
			border-radius: $slider_bar_border_radius;
		}

		// pointer
		&::-webkit-slider-thumb {
			-webkit-appearance: none;
			border: none;
			height: $slider_cursor_size;
			width: $slider_cursor_size;
			border-radius: $slider_cursor_border_radius;
			background: $slider_cursor_color;
			margin-top: -5px;
		}

		&:focus {
			outline: none;
			&::-webkit-slider-runnable-track {
				background: $slider_bar_focus_color;
			}
		}

		&::-moz-range-track {
			width: $slider_width;
			height: $slider_bar_height;
			background: $slider_bar_color;
			border: none;
			border-radius: $slider_bar_border_radius;
		}

		&::-moz-range-thumb {
			border: none;
			height: $slider_cursor_size;
			height: $slider_cursor_size;
			border-radius: $slider_cursor_border_radius;
			background: $slider_cursor_color;
		}

		&::-moz-focusring {
			outline: 1px solid white;
			outline-offset: -1px;
		}

		&::-ms-track {
			width: $slider_width;
			height: $slider_bar_height;
			background: transparent;
			border-color: transparent;
			border-width: 6px 0;
			color: transparent;
		}

		&::-ms-fill-lower {
			background: #777;
			border-radius: 10px;
		}

		&::-ms-fill-upper {
			background: $slider_bar_color;
			border-radius: 10px;
		}

		&::-ms-thumb {
			border: none;
			height: $slider_cursor_size;
			width: $slider_cursor_size;
			border-radius: $slider_cursor_border_radius;
			background: $slider_cursor_color;
		}
	}
</style>
