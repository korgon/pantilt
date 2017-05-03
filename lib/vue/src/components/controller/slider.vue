<template>
	<input type="range" :min="min" :max="max" :orient="orientation" :class="orientation">
</template>

<script>
	module.exports = {
		name: 'slider',
		props: ['axis'],
		data: function() {
			return {
				name: this.axis.name,
				type: this.axis.type,
				orientation: this.axis.type == 'pan' ? 'horizontal' : 'vertical',
				min: this.axis.bounds.min,
				max: this.axis.bounds.max,
				position: this.axis.current.position
			}
		},
		created: function() {
		}
	}
</script>

<style lang="scss">
</style>
