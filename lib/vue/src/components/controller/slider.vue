<template>
	<input type="range" v-model="position" :min="min" :max="max" class="controller-slider" :class="orientation" v-bind:style="verticalStyle">
</template>

<script>
	module.exports = {
		name: 'slider',
		props: ['axis', 'width', 'height', 'wrapperWidth'],
		data: function() {
			return {
				name: this.axis.name,
				type: this.axis.type,
				orientation: this.axis.type == 'pan' ? 'horizontal' : 'vertical',
				min: this.axis.bounds.min,
				max: this.axis.bounds.max,
				position: this.axis.current.position,
				lastPosition: undefined,
				timer: undefined
			}
		},
		computed: {
			verticalStyle: function() {
				if (this.orientation == 'vertical') {
					return {
						top: ((this.height / 2) - 5) + 'px',
						left: - (((this.width - this.height) / 2 ) - 23) + 'px',
						width: this.height + 'px'
					}
				}
			},
			theAxis: function() {
				return {
					name: this.name,
					type: this.type,
					position: this.position
				}
			}
		},
		watch: {
			position: function() {
				// only emit move event after position has stabilized
				var self = this;
				var waitTime = 150;

				if (!self.timer) {
					self.lastPosition = self.position;
				}

				this.timer = this.timer || setInterval(function() {
					var now = Date.now();
					if (self.position == self.lastPosition) {
						console.log('yup');
						self.$emit('move', self.theAxis);
						clearInterval(self.timer);
						self.timer = undefined;
					} else {
						self.lastPosition = self.position;
					}
				}, waitTime);
			}
		}
	}
</script>

<style lang="scss">
	$slider_width: 100%;
	$slider_bar_color: #eee;
	$slider_bar_focus_color: #ddd;
	$slider_bar_border_radius: 3px;
	$slider_bar_height: 6px;
	$slider_cursor_color: #8a9f9f;
	$slider_cursor_size: 16px;
	$slider_cursor_border_radius: 50%;

	.controller-slider {
		box-sizing: border-box;
		-webkit-appearance: none;
		width: $slider_width;
		// ff fix
		border: 1px solid white;

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

		&.vertical {
			position: absolute;
			-webkit-transform:rotate(270deg);
			-moz-transform:rotate(270deg);
			-o-transform:rotate(270deg);
			-ms-transform:rotate(270deg);
			transform:rotate(270deg);
		}
	}
</style>
