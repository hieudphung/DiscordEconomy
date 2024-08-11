const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your coin balance!'),
    async execute(interaction) {
        await interaction.reply('💲0');
    },
};