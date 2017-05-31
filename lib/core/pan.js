module.exports = {
	name: 'pan',
	directory: __dirname,
	type: 'pan',
	pins: 'pins',
	steps: 'steps',
	min: -200,
	max: 200,
	home: 0,
	speed: {
		min: 10,
		max: 100,
		default: 20
	},
	simulation: true,
}
