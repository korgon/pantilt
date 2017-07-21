// konva window controller
// uses clientjs

var konva = require('konva');

var Controller = function() {
	var self = this;
	var vueComponent, pan, tilt;
	var stage, layer, dragLayer;

	var grid, circle, shadow, home, coordinates;

	// color variables
	var colors = {
		grid: 'rgba(68, 68, 68, 0.5)',
		gridBorder: 'rgba(51, 51, 51, 0.5)',
		text: '#255c5c',
		indicator: 'rgba(13, 171, 171, 0.50)',
		indicatorBorder: 'rgba(20, 69, 69, 0.2)',
	}

	// holder for circle, shadow, home and points
	this.elements;

	this.initialize = function(component) {
		vueComponent = component;

		self.unload();

		var images = {
			cloudie: '/images/cloudie.png',
			home: '/images/home.png'
		}

		// load images then draw!
		loadImages(images, draw);
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

	this.moveThing = function(thing, coords) {
		if (self.elements[thing] && coords && !self.elements[thing].inMotion) {
			thing = self.elements[thing];
			var x = getGridPosition(coords.x, pan.bounds);
			var y = getGridPosition(coords.y, tilt.bounds);
			thing.x(x);
			thing.y(y);
			stage.draw();
		}
	}

	this.toggleThing = function(thing, toggle) {
		if (self.elements[thing]) {
			thing = self.elements[thing];

			if (typeof(toggle) == 'boolean') {
				// use supplied toggle value
				if (toggle) {
					thing.show();
				} else {
					thing.hide();
				}
			} else {
				// just toggle state
				if (thing.visible) {
					thing.hide();
				} else {
					thing.show();
				}
			}

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
			self.moveThing('circle', data);
		});

		client.socket.on('moved', function(data) {
			console.log('socket triggered: moved', data);
			coordinates.setAttr('text', data.x + ', ' + data.y);
			vueComponent.syncAxiiPosition(data);
			self.alignShadow();
		});

		client.socket.on('moving', function(data) {
			console.log('socket triggered: moving', data.at);
			coordinates.setAttr('text', data.at.x + ', ' + data.at.y);
			self.moveThing('shadow', data.at);
			self.moveThing('circle', data.to);
			vueComponent.updateLocation(data.at);
		});

		client.socket.on('homeSet', function(data) {
			console.log('socket triggered: homeSet', data);
			self.moveThing('home', data);
			vueComponent.syncAxiiHome(data);
		});
	}

	function detachSocketListeners() {
		// socket.io events
		client.socket.off('move');
		client.socket.off('moved');
		client.socket.off('moving');
	}

	function loadImages(sources, callback) {
		var images = {};
		var loadedImages = 0;
		var numImages = 0;
		// get num of sources
		for(var src in sources) {
			numImages++;
		}
		for(var src in sources) {
			images[src] = new Image();
			images[src].onload = function() {
				if(++loadedImages >= numImages) {
					callback(images);
				}
			};
			images[src].src = sources[src];
		}
	}

	function draw(images) {
		pan = vueComponent.pan;
		tilt = vueComponent.tilt;

		stage = new Konva.Stage({
			container: 'controller-overlay',
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

		grid = new Konva.Group({
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

		// coordinates text
		coordinates = new Konva.Text({
			text: pan.current.position + ', ' + tilt.current.position,
			fill: colors.text,
			fontSize: 8,
			x: 3,
			y: 3
		});

		layer.add(coordinates);

		// position indicator
		circle = new Konva.Circle({
			x: getGridPosition(pan.current.position, pan.bounds),
			y: getGridPosition(tilt.current.position, tilt.bounds),
			radius: 9 * vueComponent.ratio,
			fill: colors.indicator,
			stroke: colors.indicatorBorder,

			startScale: 1,
			shadowColor: 'black',
			shadowBlur: 10,
			shadowOffset: {
				x : 0,
				y : 0
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
			radius: 9 * vueComponent.ratio,
			fill: colors.indicatorBorder,
			// stroke: colors.indicator,
			startScale: 1
		});
		// add the shape to the layer
		layer.add(shadow);

		// home indicator
		home = new Konva.Circle({
			x: getGridPosition(pan.current.home, pan.bounds),
			y: getGridPosition(tilt.current.home, tilt.bounds),
			radius: 13 * vueComponent.ratio,
			strokeWidth: 2,
			stroke: colors.gridBorder,
			strokeScaleEnabled: false,
			fillPatternImage: images.home,
			fillPatternOffset: { x: (images.home.width / 2), y: (images.home.height / 2) },
			fillPatternScale: { x: (9 / (images.home.width / 2))  * vueComponent.ratio, y: (9 / (images.home.height / 2))  * vueComponent.ratio },
			opacity: 0.5,
			fillPatternRepeat: 'no-repeat',
			dash: [6 * vueComponent.ratio, 3 * vueComponent.ratio],
			startScale: 1
		});

		// add the shape to the layer
		layer.add(home);

		// position things
		coordinates.moveToTop();
		circle.moveToTop();
		home.moveToBottom();
		grid.moveToBottom();

		// make available
		self.elements = {
			grid: grid,
			circle: circle,
			shadow: shadow,
			home: home,
			coordinates: coordinates
		}

		stage.add(layer, dragLayer);

		stage.on('dragstart', function(evt) {
			var shape = evt.target;
			// moving to another layer will improve dragging performance
			shape.moveTo(dragLayer);
			stage.draw();

			shape.setAttrs({
				shadowOffset: {
					x: 15,
					y: 15
				},
				scale: {
					x: shape.getAttr('startScale') * 1.2,
					y: shape.getAttr('startScale') * 1.2
				},
			});

			shape.inMotion = true;
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
				shadowOffsetX: 0,
				shadowOffsetY: 0
			});

			shape.inMotion = false

			console.log(shape.attrs.x + ', ' + shape.attrs.y);
			self.move();
		});

		// move circle on click
		// trigger everywhere
		// stage.on('contentClick contentTap', function() {
		// 	stageClick();
		// });

		// bind keys
		bindKeys();

		// socket.io listeners
		attachSocketListners();
	}

	function bindKeys() {
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
			self.move();

			e.preventDefault(); // prevent the default action (scroll / move caret)
		}
	}
}

module.exports = new Controller();
