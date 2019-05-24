const Bots = [];

class Bot {
	constructor() {
		Bots.push(this);
	}

	init({ config }) {
		this.config = config;
		return Promise.resolve(this);
	}

	getBot(name) {
		const condition = new RegExp('^' + name + '$', 'i');
		const bot = Bots.find(b => {
			return condition.test(b.constructor.name);
		});
		return Promise.resolve(bot);
	}

	showBots() {
		console.log(Bots);
		return Promise.resolve(this);
	}

	static isBot() {
		return Promise.resolve(this);
	}
}

module.exports = Bot;
