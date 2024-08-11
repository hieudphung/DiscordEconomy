const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { getLeaderboard } = require('../../economy/economy');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('🏆 Displays a leaderboard of the top 5 richest members.'),
    async execute(interaction) {
        const leaderboard = await getLeaderboard();

        if (leaderboard.length === 0) {
            return interaction.reply('Everyone is broke.');
        }

        // Embed message
        const embed = new MessageEmbed()
            .setTitle('🏆 Coin Leaderboard 🏆')
            .setColor('#C0C0C0');

        leaderboard.forEach((user, index) => {
            let medal = '';
            
            // Medals for top 5 users in server
            if (index === 0) medal = '🥇'; 
            if (index === 1) medal = '🥈'; 
            if (index === 2) medal = '🥉'; 
            if (index === 3) medal = '🎖️'; 
            if (index === 4) medal = '🎖️'; 

            embed.addFields({ name: `${medal} ${user.name}`, value: `${user.coins} coins`, inline: false });
        });

        await interaction.reply({ embeds: [embed] });
    },
};
