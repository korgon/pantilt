// konva window controller
// uses clientjs

var konva = require('konva');

var Controller = function() {
	var self = this;
	var vueComponent, pan, tilt;
	var stage, layer, dragLayer;
	var stageWidth, stageHeight;
	var scale = 1;

	var circle, shadow, home, points;

	// color variables
	var colors = {
		grid: '#e8ecec',
		gridBorder: '#d0dada',
		indicator: 'rgba(13, 171, 171, 0.50)',
		indicatorBorder: 'rgba(20, 69, 69, 0.2)',
	}

	// holder for circle, shadow, home and points
	this.elements;

	this.initialize = function(component) {
		self.unload();

		vueComponent = component;
		pan = vueComponent.pan;
		tilt = vueComponent.tilt;
		stageWidth = vueComponent.width;
		stageHeight = vueComponent.height;

		var tween = null;

		stage = new Konva.Stage({
			container: 'controller-window',
			width: vueComponent.width,
			height: vueComponent.height
		});

		layer = new Konva.Layer();
		dragLayer = new Konva.Layer();

		var border = new Konva.Group({
			x: 0,
			y: 0
		});

		// border lines
		var top = new Konva.Line({
			points: [0, 0, stage.width(), 0],
			stroke: colors.gridBorder,
			strokeWidth: 4
		});
		var right = new Konva.Line({
			points: [stage.width(), 0, stage.width(), stage.height()],
			stroke: colors.gridBorder,
			strokeWidth: 4
		});
		var bottom = new Konva.Line({
			points: [0, stage.height(), stage.width(), stage.height()],
			stroke: colors.gridBorder,
			strokeWidth: 4
		});
		var left = new Konva.Line({
			points: [0, 0, 0, stage.height()],
			stroke: colors.gridBorder,
			strokeWidth: 4
		});
		border.add(top);
		border.add(right);
		border.add(bottom);
		border.add(left);

		layer.add(border);

		var grid = new Konva.Group({
			x: 0,
			y: 0
		});


		// tilt lines
		for (var h = 0; h <= (tilt.bounds.range * vueComponent.ratio); h += (20 * vueComponent.ratio)) {
			var line = new Konva.Line({
				points: [0, h, stage.width(), h],
				stroke: colors.grid,
				strokeWidth: 1
			});
			grid.add(line);
		}

		// pan lines
		for (var h = 0; h <= (pan.bounds.range * vueComponent.ratio); h += (20 * vueComponent.ratio)) {
			var line = new Konva.Line({
				points: [h, 0, h, stage.height()],
				stroke: colors.grid,
				strokeWidth: 1
			});
			grid.add(line);
		}

		layer.add(grid);

		// position indicator
		circle = new Konva.Circle({
			x: getGridPosition(pan.current.position, pan.bounds),
			y: getGridPosition(tilt.current.position, tilt.bounds),
			radius: 15,
			fill: colors.indicator,
			stroke: colors.indicatorBorder,

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

		// position indicator
		shadow = new Konva.Circle({
			x: getGridPosition(pan.current.position, pan.bounds),
			y: getGridPosition(tilt.current.position, tilt.bounds),
			radius: 15,
			fill: colors.indicatorBorder,
			stroke: colors.indicator,
			startScale: 1
		});
		// add the shape to the layer
		layer.add(shadow);

		// home indicator
		home = new Konva.Circle({
			x: getGridPosition(pan.current.home, pan.bounds),
			y: getGridPosition(tilt.current.home, tilt.bounds),
			radius: 20,
			fill: '#fff',
			strokeWidth: 1,
			stroke: colors.grid,
			dash: [12, 3],
			startScale: 1
		});
		// add the shape to the layer
		layer.add(home);

		// position things
		circle.moveToTop();
		grid.moveToBottom();
		home.moveToBottom();

		// make available
		self.elements = {
			circle: circle,
			shadow: shadow,
			home: home
		}

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
		// trigger everywhere
		stage.on('contentClick', function() {
			stageClick();
		});
		stage.on('tap', function() {
			stageClick();
		});

		// bind keys
		bindKeys();

		// socket.io listeners
		attachSocketListners();
	}

	this.unload = function() {
		document.onkeydown = undefined;
		detachSocketListeners();
	}

	this.clearShadow = function() {
		shadow.hide();
		stage.draw();
	}

	this.alignShadow = function() {
		shadow.x(circle.x());
		shadow.y(circle.y());
		stage.draw();
	}

	this.moveThing = function(coords, thing) {
		if (self.elements[thing] && coords.x && coords.y) {
			thing = self.elements[thing];
			var x = getGridPosition(coords.x, pan.bounds);
			var y = getGridPosition(coords.y, tilt.bounds);
			thing.x(x);
			thing.y(y);
			stage.draw();
		}
	}

	this.move = function() {
		// translate circle location to axis locations
		var x = circle.x();
		var y = circle.y();

		console.log('circle:', x, ',', y);

		var convertedX = getAxisPosition(x, pan.bounds);
		var convertedY = getAxisPosition(y, tilt.bounds);

		console.log('actual:', convertedX, ',', convertedY);
		vueComponent.move({ x: convertedX, y: convertedY });
	}

	function stageClick() {
		console.log('CLICK POSITION', stage.getPointerPosition());
		circle.x(stage.getPointerPosition().x);
		circle.y(stage.getPointerPosition().y);
		stage.draw();
		self.move();
	}

	function getAxisPosition(position, bounds) {
		var ratio = vueComponent.ratio;
		var convertedPosition = Math.round(position / ratio);

		if (bounds.min < 0) {
			if (convertedPosition <= bounds.max) {
				return bounds.min + convertedPosition;
			} else {
				return (bounds.max - convertedPosition) * -1;
			}
		} else {
			return convertedPosition;
		}
	}

	function getGridPosition(position, bounds) {
		var ratio = vueComponent.ratio;
		var convertedPosition = position * ratio;

		if (bounds.min < 0) {
			if (position == 0) {
				return (bounds.range - bounds.max) * ratio;
			} else if (position < 0) {
				return ((bounds.range - bounds.max) + position) * ratio;
			} else {
				return (bounds.range - bounds.max + position) * ratio;
			}
		} else {
			return convertedPosition;
		}
	}

	function attachSocketListners() {
		// socket.io events
		client.socket.on('move', function(data) {
			console.log('socket triggered: move', data);
			self.moveThing(data, 'circle');
		});

		client.socket.on('moved', function(data) {
			console.log('socket triggered: moved', data);
			self.alignShadow();
		});

		client.socket.on('moving', function(data) {
			console.log('socket triggered: moving', data);
			self.moveThing(data, 'shadow');
		});
	}

	function detachSocketListeners() {
		// socket.io events
		client.socket.off('move');
		client.socket.off('moved');
		client.socket.off('moving');
	}

	function bindKeys() {
		console.log('binding keys!!!');
		document.onkeydown = function(e) {
			var ratio = vueComponent.ratio;
			var x = Math.round(circle.x() * ratio);
			var y = Math.round(circle.x() * ratio);

			switch(e.keyCode) {
				case 37: // left
				if (circle.x() > 0) {
					circle.x(circle.x() - 1*ratio);
				}
				break;

				case 38: // up
				if (circle.y() > 0) {
					circle.y(circle.y() - 1*ratio);
				}
				break;

				case 39: // right
				if (circle.x() < stage.width()) {
					circle.x(circle.x() + 1*ratio);
				}
				break;

				case 40: // down
				if (circle.y() < stage.height()) {
					circle.y(circle.y() + 1*ratio);
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
