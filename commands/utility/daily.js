const { SlashCommandBuilder } = require('discord.js');
const economy = require('../../economy/economy');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('⏰ Claim the daily coins reward.'),
    
    async execute(interaction) {
        const userId = interaction.user.id;

        // Give X coins
        const reward = 5;
        economy.addCoins(userId, reward);

        // Bot Message
        await interaction.reply(`${interaction.user.username}, you have claimed your daily reward of ${reward} coins!`);
    },
};
