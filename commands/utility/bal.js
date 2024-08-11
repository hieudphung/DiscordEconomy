const { SlashCommandBuilder } = require('discord.js');
//const { supabase } = require('../../bot.js')
const economy = require('../../economy/economy');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your balance!'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const serverId = interaction.guild?.id;
        const balance = await economy.getBal(userId, serverId)
        await interaction.reply(`Your balance is: 💲${balance}`);
    },
};