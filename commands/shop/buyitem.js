const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buyitem')
        .setDescription('💱 CASHMONEY!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};