const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class IssCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'iss',
			aliases: ['international-space-station'],
			group: 'events',
			memberName: 'iss',
			description: 'Responds with where the Internation Space Station currently is.'
		});
	}

	async run(msg) {
		try {
			const { body } = await request.get('http://api.open-notify.org/iss-now.json');
			const position = body.iss_position;
			return msg.say(`The ISS is currently at **${position.latitude}, ${position.longitude}**.`);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
