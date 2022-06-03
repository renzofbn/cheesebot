const {Client, Intents, Collection} = require('discord.js');
require('dotenv').config();

// import global variables and data
const config = require('./config.json');
const { join } = require('path');


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
client.language = require('i18n');

client.language.configure({
    locales: ['en', 'es'],
    directory: join(__dirname, 'locales'),
    defaultLocale: 'es',
    retryInDefaultLocale: true,
    objectNotation: true,
    register: global,

    logWarnFn: function (message) {
        console.warn(message);
    },

    logErrorFn: function (message) {
        console.error(message);
    },

    missingKeyFn: function (locale, value) {
        return value;
    },

    mustacheConfig: {
        tags: ["{{","}}"],
        disable: false
    }
    
})

client.language.setLocale('es');


require("./handlers/events.js")(client);
require("./handlers/commands.js")(client);

client.login(config.token);

// client.login(process.env.TOKEN);