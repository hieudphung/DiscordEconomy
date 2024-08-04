// coin.js
const coinConfig = {
    startingBalance: 100,     // Default balance for new users
    dailyQuestReward: 50,     // Reward for completing a daily quest
    challengeQuestReward: 150, // Reward for completing a challenge quest
    shopItems: {               // Items available in the shop
        'game1': 500,
        'game2': 1000,
        'game3': 2000,
    }
};

module.exports = coinConfig;
