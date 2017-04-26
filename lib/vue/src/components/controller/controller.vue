<template>
	<div>
		<div id="controlGrid"></div>
	</div>
</template>

<script>
	// fabric
	var konva = require('konva');

	module.exports = {
		name: 'controller',
		data: function() {
			return {
				msg: 'Get moving.'
			}
		},
		created: function() {
			client.init().then(function() {
				console.log(client);
				initializeGrid();
			}).catch(function(err) {
				console.log('controller creation error:', err);
			});
		}
	}

	function initializeGrid() {
		var width = client.axis.pan.range;
		var height = client.axis.tilt.range;

		var tween = null;

		var stage = new Konva.Stage({
			container: 'controlGrid',
			width: width,
			height: height
		});

		var layer = new Konva.Layer();
		var dragLayer = new Konva.Layer();

		var circle = new Konva.Circle({
			x: stage.getWidth() / 2,
			y: stage.getHeight() / 2,
			radius: 10,
			fill: 'red',
			stroke: 'black',
			scale: {
				x : 1,
				y : 1
			},
			startScale: 1,
			shadowColor: 'black',
			shadowBlur: 10,
			shadowOffset: {
				x : 5,
				y : 5
			},
			shadowOpacity: 0.6,
			strokeWidth: 4,
			draggable: true,
			dragBoundFunc: function(pos) {
				var newY = pos.y < 0 ? 0 : (pos.y > stage.getHeight() ? stage.getHeight() : pos.y);
				var newX = pos.x < 0 ? 0 : (pos.x > stage.getWidth() ? stage.getWidth() : pos.x);
				return {
					x: newX,
					y: newY
				};
			}
		});
		// add the shape to the layer
		layer.add(circle);

		stage.add(layer, dragLayer);

		stage.on('dragstart', function(evt) {
			var shape = evt.target;
			console.log('dragging', shape);
			// moving to another layer will improve dragging performance
			shape.moveTo(dragLayer);
			stage.draw();

			if (tween) {
				tween.pause();
			}
			shape.setAttrs({
				shadowOffset: {
					x: 15,
					y: 15
				},
				scale: {
					x: shape.getAttr('startScale') * 1.2,
					y: shape.getAttr('startScale') * 1.2
				}
			});
		});

		stage.on('dragend', function(evt) {
			var shape = evt.target;
			shape.moveTo(layer);
			stage.draw();
			shape.to({
				duration: 0.5,
				easing: Konva.Easings.ElasticEaseOut,
				scaleX: shape.getAttr('startScale'),
				scaleY: shape.getAttr('startScale'),
				shadowOffsetX: 5,
				shadowOffsetY: 5
			});

			console.log(shape.attrs.x + ', ' + shape.attrs.y);
		});
	}
</script>

<style lang="scss">
</style>
