<template>
	<div>
		<h4>Control it!</h4>
		<controller></controller>
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
		data: function() {
			return {

			}
		},
		created: function() {
		},
		methods: {

		}
	}
</script>

<style lang="scss">
</style>
