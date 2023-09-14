const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");
const { handleErrors } = require("./Handlers/errorHandler");
const client = new Client({ intents: [Guilds, GuildMembers, GuildMessages], partials: [User, Message, GuildMember, ThreadMember] });


// .ENV STUFF
require("dotenv").config();
const token = process.env.token;
const webhookUrl = `${process.env.ERR_WEB}`;

handleErrors(client, webhookUrl);

client.commands = new Collection();
client.config = require("./config");
client.login(token).then(() => {
  loadEvents(client);
  loadCommands(client);
});
