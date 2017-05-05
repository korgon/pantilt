// konva window controller

var Controller = function() {
	var self = this;
	var vueComponent;
	var stage, layer, dragLayer;
	var stageWidth, stageHeight;
	var scale = 1;
	var circle;

	this.initialize = function(component) {
		vueComponent = component;
		stageWidth = vueComponent.width;
		stageHeight = vueComponent.height;
		console.log(vueComponent);

		var tween = null;

		stage = new Konva.Stage({
			container: 'controller-window',
			width: vueComponent.width,
			height: vueComponent.height
		});

		layer = new Konva.Layer();
		dragLayer = new Konva.Layer();

		var lines = new Konva.Group({
			x: 0,
			y: 0
		});

		// tilt lines
		for (var h = 20; h <= (vueComponent.tilt.bounds.range * vueComponent.ratio); h += (20 * vueComponent.ratio)) {
			var line = new Konva.Line({
				points: [0, h, stage.width(), h],
				stroke: 'rgba(138, 159, 159, 0.27)',
				strokeWidth: 1
			});
			lines.add(line);
			console.log('adding line @', h);
		}

		// pan lines
		for (var h = 20; h <= (vueComponent.pan.bounds.range * vueComponent.ratio); h += (20 * vueComponent.ratio)) {
			var line = new Konva.Line({
				points: [h, 0, h, stage.height()],
				stroke: 'rgba(138, 159, 159, 0.27)',
				strokeWidth: 1
			});
			lines.add(line);
			console.log('adding line @', h);
		}

		layer.add(lines);

		// position indicator
		circle = new Konva.Circle({
			x: stage.getWidth() / 2,
			y: stage.getHeight() / 2,
			radius: 33,
			fill: 'rgba(13, 171, 171, 0.50)',
			stroke: 'rgba(0, 0, 0, 0.50)',

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
			self.move();
		});

		// move circle on click
		// trigger every where
		stage.on('contentClick', function() {
			console.log(stage.getPointerPosition());
			circle.x(stage.getPointerPosition().x);
			circle.y(stage.getPointerPosition().y);
			stage.draw();
			self.move();
		});

		// bind keys
		bindKeys();
	}

	this.unload = function() {
		document.onkeydown = undefined;
	}

	this.resizeStage = function(width) {
		if (stageWidth) {
			scale = width / stageWidth;
			stage.width(stageWidth * scale);
			stage.height(stageHeight * scale);
			stage.scale({ x: scale, y: scale });
			stage.draw();
		}
	}

	this.move = function() {
		// translate circle location to axis locations
		console.log('circle:', circle.x(), ',', circle.y());
		vueComponent.move();
	}

	function bindKeys() {
		console.log('binding keys!!!');
		document.onkeydown = function(e) {
			switch(e.keyCode) {
				case 37: // left
				if (circle.x() > 0) {
					circle.x(circle.x() - 1);
				}
				break;

				case 38: // up
				if (circle.y() > 0) {
					circle.y(circle.y() - 1);
				}
				break;

				case 39: // right
				if (circle.x() < stage.width()) {
					circle.x(circle.x() + 1);
				}
				break;

				case 40: // down
				if (circle.y() < stage.height()) {
					circle.y(circle.y() + 1);
				}
				break;

				default: return; // exit this handler for other keys
			}
			stage.draw();
			self.move();

			e.preventDefault(); // prevent the default action (scroll / move caret)
		}
	}
}

module.exports = new Controller();
