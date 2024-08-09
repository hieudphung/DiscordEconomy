const { SlashCommandBuilder } = require('discord.js');
const { getCurrentDailyQuest } = require('../../quests/dailyQuests');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dailyquest')
        .setDescription('Displays the current daily quest.'),
    async execute(interaction) {
        const currentDailyQuest = getCurrentDailyQuest();
        if (currentDailyQuest) {
            await interaction.reply(`Current daily quest: ${currentDailyQuest.name} - Reward: ${currentDailyQuest.reward} coins`);
        } else {
            await interaction.reply('No daily quest available.');
        }
    },
};
