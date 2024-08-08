const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        /*const userId = message.author.id;
        if (!userShops[userId]) {
            return message.channel.send('Your shop has literally nothing.');
        }
        let shopMessage = 'Your shop items:\n';
        for (let [item, price] of Object.entries(userShops[userId])) {
        shopMessage += `${item}: ${price} coins\n`;
        }
        message.channel.send(shopMessage);*/
        await interaction.reply('Pong!');
    },
};


    

    