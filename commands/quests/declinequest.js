const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('declinequest')
        .setDescription('❌ Declines the current daily quest.'),
    async execute(interaction) {
        await interaction.reply(`${interaction.user.username} has declined the quest.`);
    },
};
