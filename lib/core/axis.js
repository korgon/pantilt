// to build upon for pan/tilt
"use strict";

const fspro = require('_/fspro');

// goTo, getPosition

// axis factory
const axis = (settings) => {
	let state = {
		name: settings.name,
		json_file: settings.directory + '/.' + settings.name + '.json',
		type: settings.type,
		pins: settings.pins,
		steps: settings.steps,
		speed: settings.speed,
		max: settings.max,
		min: settings.min,
		home: settings.home,
		simulation: settings.simulation,
		center: undefined,
		moving: false,
		// current are values that are reloaded on instantiation
		current: {
			home: settings.home,
			speed: settings.speed,
			position: settings.position || 0,
		}
	}

	return init(state).then(() => {
		return Object.assign(
			{},
			{
				name: state.name,
				type: state.type,
				current: state.current
			},
			getState(state),
			getCurrent(state),
			goTo(state),
			goHome(state),
			setSpeed(state),
			setHome(state),
			stop(state)
		);
	}).catch(err => {
		throw err;
	});
}

// initializtion
const init = (state) => {
	// set center
	if (typeof(state.min) == 'number' && typeof(state.max) == 'number') {
		if (state.min < state.max) {
			state.center = (state.max + Math.abs(state.min)) / 2;
		} else {
			throw new Error('init: max and min are not valid.');
		}
	} else {
		throw new Error('init: max and min are not valid number.');
	}

	// home the axis
	return goHome(state).goHome().then(() => {
		// load current state
		return load(state);
	}).catch(err => {
		console.log(err);
		throw err;
	});
}

// return a new object with the current state
const getCurrent = (state) => ({
	getCurrent: () => {
		return Object.assign(
			{},
			state.current
		);
	}
});

// return a new object with the state
const getState = (state) => ({
	getState: () => {
		return Object.assign(
			{},
			state
		);
	}
});

// move axis to position
const goTo = (state) => ({
	goTo: (pos) => {
		return new Promise(function(resolve, reject) {
			if (typeof(pos) == 'number') {
				if (pos < state.min || pos > state.max) {
					throw new Error('goTo: ' + pos + ' is outside boundary.');
				}

				let distance, direction;
				if (pos > state.current.position) {
					direction = 1;
					distance = pos - state.current.position;
				} else if (pos < state.current.position) {
					direction = -1;
					distance = Math.abs(state.current.position - pos);
				} else {
					// not moving...
					return resolve(state.current.position);
				}

				console.log('moving ' + state.name + '... from ' + state.current.position + ' -> ' + pos);

				if (state.simulation) {
					// simulated movement
					state.moving = true;

					let makeMove = setInterval(function() {
						let step = 0.2;

						console.log(state.current.position);

						if (state.current.position == pos || state.moving == false) {
							// done moving
							state.moving = false;
							clearInterval(makeMove);
							save(state).then(() => {
								return resolve(state.current.position);
							});
						} else {
							state.current.position += (direction * step);
							state.current.position = parseFloat(state.current.position.toFixed(2));
						}
					}, state.current.speed);
				} else {
					// TODO actual moving
				}
			} else {
				throw new Error('goTo: ' + pos + ' is an invalid location.');
			}
		});
	}
});

// home axis
const goHome = (state) => ({
	goHome: () => {
		return new Promise(function(resolve, reject) {
			// TODO write homing algorithm for pan and tilt
			// assign function based on state.type
			console.log(state.name + ' >>> GOING HOME!!!');
			if (state.type == 'tilt') {
				goTo(state).goTo(state.current.home);
			} else if (state.type == 'pan') {
				goTo(state).goTo(state.current.home);
			}
			return resolve();
		});
	}
});

// save current state to JSON file
const save = (state) => {
	console.log('saving');
	return fspro.putJSON(state.json_file, state.current);
}

// load current state from JSON file
const load = (state) => {
	console.log('loading');
	return fspro.exists(state.json_file).then(stats => {
		if (stats) {
			// load last state json
			return fspro.getJSON(state.json_file);
		} else {
			return Promise.resolve();
		}
	}).then(data => {
		if (data) {
			console.log('thedatas', data);
			state.current.home = data.home;
			state.current.speed = data.speed;
			return goTo(state).goTo(data.position);
		}
	}).catch(err => {
		console.log('ohnoes!', err);
	});
}

// set new speed
const setSpeed = (state) => ({
	setSpeed: (speed) => {
		state.current.speed = speed;
		return save(state);
	}
});

// set home
const setHome = (state) => ({
	setHome: (home) => {
		state.current.home = home;
		return save(state);
	}
});

// stop moving if moving
const stop = (state) => ({
	stop: () => {
		state.moving = false;
	}
});

// * * * * * * * * * * * */

// module exports
module.exports = function(config) {
	// expecting config:
	/*
	{
		name,
		directory,
		type,
		pins,
		steps,
		max,
		min,
		home,
		speed
	}
	*/
	return axis(config);
}
