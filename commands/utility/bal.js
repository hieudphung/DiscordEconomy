const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Prints the caller\'s balance!'),
    async execute(interaction) {
        await interaction.reply('𝕮0');
    },
};