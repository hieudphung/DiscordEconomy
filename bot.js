// Load env variables
require('dotenv').config(); 

const { Client, GatewayIntentBits } = require('discord.js');
const { SlashCommandBuilder, REST, Routes } = require('@discordjs/builders');
const cron = require('cron');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Schedule daily quest reset at midnight
    const resetJob = new cron.CronJob('0 0 * * *', () => {
        quests.resetDailyQuest(client);
    });
    resetJob.start();
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const { commandName } = interaction;

        if (commandName === 'balance') {
            const userId = interaction.user.id;
            const balance = economy.getBalance(userId);
            await interaction.reply(`${interaction.user.username}, you have ${balance} coins.`);
        } else if (commandName === 'editshop') {
            const itemName = interaction.options.getString('item');
            const itemPrice = interaction.options.getInteger('price');
            shop.editShop(interaction, itemName, itemPrice);
        } else if (commandName === 'buy') {
            const itemName = interaction.options.getString('item');
            shop.buyItem(interaction, itemName);
        }
    } else if (interaction.isButton()) {
        if (interaction.customId === 'accept') {
            quests.acceptQuest(interaction);
        } else if (interaction.customId === 'decline') {
            quests.declineQuest(interaction);
        }
    }
});

// Token from .env
client.login(process.env.TOKEN); 

// Slash commands
const commands = [
    new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your coin balance'),
    new SlashCommandBuilder()
        .setName('editshop')
        .setDescription('Edit your shop')
        .addStringOption(option =>
            option.setName('item')
                .setDescription('The name of the item')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('price')
                .setDescription('The price of the item')
                .setRequired(true)),
    new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Buy an item from someone\'s shop')
        .addStringOption(option =>
            option.setName('item')
                .setDescription('The name of the item')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('seller')
                .setDescription('The user selling the item')
                .setRequired(true)),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
