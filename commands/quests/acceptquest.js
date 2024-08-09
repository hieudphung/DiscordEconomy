const { SlashCommandBuilder } = require('discord.js');
const economy = require('../../economy/economy'); 
const { currentDailyQuest } = require('../../quests/dailyQuests');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('acceptquest')
        .setDescription('Accepts the daily quest.'),
    async execute(interaction) {
        if (currentDailyQuest) {
            const userId = interaction.user.id;
            economy.addCoins(userId, currentDailyQuest.reward);
            await interaction.reply(`${interaction.user.username}, you completed "${currentDailyQuest.name}" and earned ${currentDailyQuest.reward} coins!`);
        } else {
            await interaction.reply('No daily quest available.');
        }
    },
};
