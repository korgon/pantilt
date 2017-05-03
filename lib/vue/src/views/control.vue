<template>
	<div>
		<controller :axii="axii"></controller>
	</div>
</template>

<script>
	// components
	var controller = require('../components/controller/controller.vue');

	module.exports = {
		name: 'control',
		components: {
			controller
		},
		props: ['axii'],
		data: function() {
			return {
			}
		},
		created: function() {
			var self = this;


		},
		methods: {

		}
	}
</script>

<style lang="scss">
</style>
