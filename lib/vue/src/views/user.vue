<template>
	<div>
		<h4>User</h4>
		<button @click="save()">Save</button>
	</div>
</template>

<script>
	module.exports = {
		name: 'user',
		props: ['user'],
		data: function() {
			return {

			}
		},
		created: function() {
		},
		methods: {
			save: function() {
				this.$emit('previousView');
			}
		}
	}
</script>

<style lang="scss">
</style>
