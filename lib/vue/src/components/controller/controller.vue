<template>
	<div>
		<canvas id="controlGrid" width="300" height="300"></canvas>
	</div>
</template>

<script>
  // fabric
  var fabric = require('fabric').fabric;

	module.exports = {
		name: 'controller',
		data: function() {
			return {
				msg: 'Get moving.'
			}
		},
		created: function() {
			setTimeout(function() {
				var grid = new fabric.Canvas('controlGrid');
				var rect = new fabric.Rect({
					top : 100,
					left : 100,
					width : 60,
					height : 70,
					fill : 'red'
				});

				grid.add(rect);
			});
		}
	}
</script>

<style lang="scss">
</style>
