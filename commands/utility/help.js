const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('A list of all commands and what they do.'),
    async execute(interaction) {
        
        // Command List
        const commands = [
            { name: '/leaderboard', description: 'Shows the richest of the richest.' },
            { name: '/coinflip', description: 'Insert gambling addiction here.' },
            { name: '/dailyquest', description: 'Free money.' },
            { name: '/acceptquest', description: 'Accept the quest at hand.' },
            { name: '/declinequest', description: 'Throw the quest in the trash.' },
            { name: '/resetdailyquest', description: 'Reset the daily quest at 12:00am.' },
            
        ];

        // Embed message
        const embed = new EmbedBuilder()
            .setTitle('📖 Help Menu 📖')
            .setColor('#C0C0C0')
            .setDescription('A list of all commands.')
            .setFooter({ text: 'Use / before each command.' });

        commands.forEach(command => {
            embed.addFields({ name: command.name, value: command.description, inline: false });
        });

        await interaction.reply({ embeds: [embed] });
    },
};
