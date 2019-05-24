const Bot = require('./Bot');

// for test
class Mocker extends Bot {
	constructor() {
		super();
	}

	init({ config }) {
		return super.init({ config }).then(() => this);
	}

	start() {
		this.data = 'This is mock data';

		return Promise.resolve(this);
	}

	getTime(input) {
		return Promise.resolve({ time: new Date().getTime() });
	}

	getData() {
		return Promise.resolve(this.data);
	}

	toHex({ body }) {
		if (typeof body.number === 'number') {
			return Promise.resolve(body.number.toString(16));
		} else {
			return Promise.resolve('Please pass a number');
		}
	}
}

module.exports = Mocker;
