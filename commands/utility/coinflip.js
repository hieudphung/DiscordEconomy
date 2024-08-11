const { SlashCommandBuilder } = require('discord.js');
const economy = require('../../economy/economy');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('🎰 Flip a coin and bet your coins.')
        .addStringOption(option => 
            option.setName('guess')
                .setDescription('Your guess: heads or tails')
                .setRequired(true)
                .addChoices(
                    { name: 'Heads', value: 'heads' },
                    { name: 'Tails', value: 'tails' },
                ))
        .addIntegerOption(option => 
            option.setName('betamount')
                .setDescription('The amount of coins to bet')
                .setRequired(true)),
    
    async execute(interaction) {
        const guess = interaction.options.getString('guess');
        const betAmount = interaction.options.getInteger('betamount');
        const userId = interaction.user.id;
        const balance = economy.getBalance(userId);

        // Choosing the bet amount
        if (betAmount <= 0 || betAmount > balance) {
            return interaction.reply("You're too broke to bet that much. 😂");
        }

        // Outcome of game
        const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
        const resultMessage = outcome === guess.toLowerCase() ? 
            `Congratulations! The coin landed on ${outcome}. You won ${betAmount * 2} coins.` :
            `RIP XD! The coin landed on ${outcome}. You lost ${betAmount} coins.`;

        // Update the balance
        const winningsOrLoss = outcome === guess.toLowerCase() ? betAmount : -betAmount;
        economy.updateBalance(userId, winningsOrLoss);

        // Send the result message
        await interaction.reply(resultMessage);
    },
};
