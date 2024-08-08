const { MessageActionRow, MessageButton } = require('discord.js');
const economy = require('../../economy/economy');

// game
async function coinFlip(message, guess, betAmount) {
    const userId = message.author.id;
    const balance = economy.getBalance(userId);

    // Choosing the bet amount
    if (betAmount <= 0 || betAmount > balance) {
        return message.reply("You're too broke to bet that much. 😂");
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
    await message.reply(resultMessage);
}

module.exports = {
    coinFlip,
};
