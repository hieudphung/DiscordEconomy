const { supabase } = require('../bot.js')

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
    getBal,
    addBal,
};

async function getBal(discord_id, server_id) {
    let { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('discord_uid', discord_id)
      .eq('server_id', server_id);
    console.log(discord_id)
    console.log(server_id)
    balance = 0
      if (error) {
        console.error('Error fetching data:', error)
      } else {
        if (data.length < 1) {
            let { error } = await supabase
              .from('Users')
              .insert({discord_uid: discord_id, server_id: server_id})
            balance = 0
        } else {
            console.log('Balance:', data[0]['balance'])
            balance =  data[0]['balance'];
        }
    }
    return balance
}

async function addBal(discord_id, server_id, amount) {
    let balance = await getBal(discord_id, server_id)
    let { data, error } = await supabase
      .from('Users')
      .update({balance: balance + amount}) // Increment the balance by amount
      .eq('discord_uid', discord_id)
      .eq('server_id', server_id)
      .select('*');
    console.log(discord_id)
    console.log(server_id)
    balance2 = 0
      if (error) {
        console.error('Error fetching data:', error)
      } else {
        if (data.length < 1) {
            let { error } = await supabase
              .from('Users')
              .insert({discord_uid: discord_id, server_id: server_id})
            balance = amount
        } else {
            console.log('Balance:', data[0]['balance'])
            balance =  data[0]['balance'];
        }
    }
    return balance
}