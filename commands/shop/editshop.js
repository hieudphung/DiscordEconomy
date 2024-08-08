const { SlashCommandBuilder } = require('discord.js');

// Memory for shops
const userShops = {}; 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('editshop')
        .setDescription('Replies with Pong!')
        .addStringOption(option =>
            option
                .setName('item')
                .setDescription('The item to add to the shop.')
                .setRequired(true))
        .addIntegerOption(option =>
            option
                .setName('price')
                .setDescription('The sales price of the item you are selling.'))
        ,
    async execute(interaction) {
        const userId = interaction.user.id;

        if (!userShops[userId]) {
            userShops[userId] = {};
        }
    
        
        const itemName = interaction.options.getString('item');
        const itemPrice = interaction.options.getInteger('price');
        userShops[userId][itemName] = itemPrice;

        await interaction.reply(`Your shop has been updated with ${itemName} for 𝕮${itemPrice}.`);
    },
};