// Load env variables
require('dotenv').config(); 

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');


const { SlashCommandBuilder, REST, Routes } = require('@discordjs/builders');
const cron = require('cron');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}



client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Schedule daily quest reset at midnight
    const resetJob = new cron.CronJob('0 0 * * *', () => {
        quests.resetDailyQuest(client);
    });
    resetJob.start();
});


client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});


/*

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

*/

// Token from .env
client.login(process.env.TOKEN); 

// Slash commands

/*

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

*/

// turned on intents to make bot run but did not respond

// client.setToken(process.env.TOKEN);
// const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
/* rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
*/