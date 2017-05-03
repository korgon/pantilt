<template>
	<div v-cloak class="controller-grid" v-bind:style="gridStyle">
		<span>{{ width }} x {{ height }}</span>
		<span class="controller-grid--cursor" v-bind:style="cursorStyle"></span>
	</div>
</template>

<script>
	module.exports = {
		name: 'grid',
		props: ['wrapperWidth', 'height', 'width', 'axii', 'ratio'],
		data: function() {
			return {
			}
		},
		computed: {
			gridStyle: function() {
				return {
					height: this.height + 'px'
				}
			},
			cursorStyle: function() {
				var top, left;

				if (this.axii.tilt.current.position >= 0) {
					top = (+this.axii.tilt.bounds.range - +this.axii.tilt.current.position) * this.ratio;
				} else {
					top = (+this.axii.tilt.bounds.range + +this.axii.tilt.current.position) * this.ratio;
				}

				left = (this.width / 2) + (this.axii.pan.current.position * this.ratio);

				console.log(top);

				return {
					top: top + 'px',
					left: left + 'px'
				}
			}
		},
		watch: {
			width: function() {
				this.resizeGrid();
			}
		},
		created: function() {
			this.resizeGrid();
		},
		methods: {
			resizeGrid: function() {
				var self = this;

				if (self.width) {
					console.log('resizing grid!', self.width);
				}
			}
		}
	}

</script>

<style lang="scss">
	.controller-grid {
		position: relative;
		height: auto;
		width: 100%;
		background-color: #eee;
	}

	.controller-grid--cursor {
		position: absolute;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: #2fbfbf;
	}
</style>
