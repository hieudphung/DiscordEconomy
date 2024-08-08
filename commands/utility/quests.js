// quests.js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const economy = require('../../economy/economy');
const dailyQuests = require('../../quests/dailyQuests'); // Import the daily quests

let currentDailyQuest = null;

// Function to get a new daily quest
function getNewDailyQuest() {
    currentDailyQuest = dailyQuests[Math.floor(Math.random() * dailyQuests.length)];
}

// Function to handle quest acceptance
function acceptQuest(interaction) {
    const userId = interaction.user.id;
    economy.addCoins(userId, currentDailyQuest.reward);
    interaction.reply(`${interaction.user.username}, completed "${currentDailyQuest.name}" and earned ${currentDailyQuest.reward} coins!`);
}

// Function to handle quest decline
function declineQuest(interaction) {
    interaction.reply(`${interaction.user.username}, declined the quest.`);
}

// Function to reset daily quest at midnight
function resetDailyQuest(client) {
    getNewDailyQuest();

    const questMessage = `${currentDailyQuest.name} - Reward: ${currentDailyQuest.reward} coins`;

    // Create buttons for accepting or declining the quest
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('accept')
                .setLabel('Accept')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('decline')
                .setLabel('Decline')
                .setStyle(ButtonStyle.Danger),
        );

    // Find the text channel named "discord-economy"
    const channel = client.channels.cache.find(ch => ch.name === 'discord-economy' && ch.isTextBased());
    if (channel) {
        channel.send({ content: questMessage, components: [row] });
    } else {
        console.error('Channel named "discord-economy" not found.');
    }
}

module.exports = {
    resetDailyQuest,
    acceptQuest,
    declineQuest,
};
