const userBalances = {}; // In-memory store; consider using a database for persistence

// Get the balance of a user
function getBalance(userId) {
    return userBalances[userId] || 0;
}

// Set the balance of a user
function setBalance(userId, amount) {
    userBalances[userId] = amount;
}

// Add or subtract coins
function updateBalance(userId, amount) {
    const currentBalance = getBalance(userId);
    setBalance(userId, currentBalance + amount);
}

module.exports = {
    getBalance,
    setBalance,
    updateBalance,
};
