<template>
	<div class="control-wrapper">
		<div class="control-grid"><grid :axis="axis"></grid></div>
		<div class="control-slider-vertical"><slider :axis="tilt" @move="moveAxis"></slider></div>
		<div class="control-slider-horizontal"><slider :axis="pan" @move="moveAxis"></slider></div>
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
				tilt: this.axii.tilt
			}
		},
		created: function() {
		},
		methods: {
			moveAxis: function(axis) {

			}
		}
	}
</script>

<style lang="scss">
</style>
