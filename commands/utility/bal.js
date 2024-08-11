const { SlashCommandBuilder } = require('discord.js');
const { supabase } = require('../../bot.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your balance!'),
    async execute(interaction) {
        const balance = await getBal(interaction.user.id, interaction.guild?.id)
        await interaction.reply(`Your balance is: 💲${balance}`);
    },
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