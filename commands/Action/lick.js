const Command = require('../../base/Command.js');
const request = require('node-superfetch');
const { IMGUR_KEY, LICK_ALBUM_ID } = process.env; 

class Lick extends Command {
    constructor(client) {
        super(client, {
            name: 'lick',
            description: 'Licks the user you mentioned!',
            category: 'Action',
            usage: 'lick <@USER_MENTION>',
            guildOnly: true,
            aliases: ['slurp']
        });
        this.cache = null;
    }

    async run(message) {
        let user = message.mentions.members.first() 

        if (!user || !args[1]) {
            return message.reply('Command Usage: `lick <@USER_MENTION>`')
        }

        const image = await this.random();
        if (!image) return message.reply('This album has no images...');
        return message.channel.send(`_**${message.author.username}** licks **${user.username}**._`, { files: [image] });

    }

    async random() {
        if (this.cache) return this.cache[Math.floor(Math.random() * this.cache.length)];
        const { body } = await request
            .get(`https://api.imgur.com/3/album/${LICK_ALBUM_ID}`)
            .set({ Authorization: `Client-ID ${IMGUR_KEY}` });
        if (!body.data.images.length) return null;
        this.cache = body.data.images.map(image => image.link);
        setTimeout(() => { this.cache = null; }, 3.6e+6);
        return body.data.images[Math.floor(Math.random() * body.data.images.length)].link;
    }
};

module.exports = Lick;