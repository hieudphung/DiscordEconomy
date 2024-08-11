const { SlashCommandBuilder } = require('discord.js');
const economy = require('../../economy/economy');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('⏰ Claim the daily coins reward.'),
    
    async execute(interaction) {
        const userId = interaction.user.id;
        const serverId = interaction.guild?.id;
        // Give X coins
        const reward = 5;
        const balance = await economy.addBal(userId, serverId, reward)

        // Bot Message
        await interaction.reply(`${interaction.user.username}, you have claimed your daily reward of ${reward} coins!\n You're new balance is ${balance}`);
    },
};
