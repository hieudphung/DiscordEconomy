const economy = require('../../economy/economy');
const coinConfig = require('../../economy/coin');

// Memory for shops
const userShops = {}; 

// Editshop command
function editShop(interaction, itemName, itemPrice) {
    const userId = interaction.user.id;

    if (!userShops[userId]) {
        userShops[userId] = {};
    }

    userShops[userId][itemName] = itemPrice;
    interaction.reply(`Your shop has been updated with ${itemName} for ${itemPrice} coins.`);
}

// Buy command
async function buyItem(interaction, itemName) {
    const buyerId = interaction.user.id;
    const sellerId = interaction.options.getUser('seller').id;

    if (!userShops[sellerId] || !userShops[sellerId][itemName]) {
        return interaction.reply("Item not found in the seller's shop.");
    }

    const itemPrice = userShops[sellerId][itemName];
    const buyerBalance = economy.getBalance(buyerId);
    const sellerBalance = economy.getBalance(sellerId);

    if (buyerBalance < itemPrice) {
        return interaction.reply("You can't afford this.");
    }

    // Transaction
    economy.addCoins(buyerId, -itemPrice);
    economy.addCoins(sellerId, itemPrice);

    interaction.reply(`You have bought ${itemName} for ${itemPrice} coins. ${itemPrice} coins have been added to ${interaction.options.getUser('seller').username}'s wallet.`);
}

// User's shop display
function displayShop(message) {
    const userId = message.author.id;
    if (!userShops[userId]) {
        return message.channel.send('Your shop has literally nothing.');
    }

    let shopMessage = 'Your shop items:\n';
    for (let [item, price] of Object.entries(userShops[userId])) {
        shopMessage += `${item}: ${price} coins\n`;
    }
    message.channel.send(shopMessage);
}

module.exports = {
    editShop,
    buyItem,
    displayShop,
};
