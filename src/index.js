// Discord Requires
const { Client, Partials, Collection } = require("discord.js");
const process = require("node:process");

// Colorette Requiress
const { bold, red, redBright } = require("colorette"); // Importing the 'bold' function from the 'colorette' package
const { log } = require("./utils/log.js");

// Node Requires
const fs = require("fs");
const path = require("path");

if (!fs.existsSync(path.join(__dirname, "config.json"))) {
  log.warn(`config.json does not exist! Please create one.`);
  process.exit(1);
}

// Get config
const config = require("./config.json");

if (!config.token) {
  console.warn(
    `${bold(red("[WARN]"))} Token is not set! Please check "config.json"`
  );
  process.exit(1);
} else if (!config.mongoURL) {
  console.warn(
    `${bold(red("[WARN]"))} Mongo URL is not set! Please check "config.json"`
  );
  process.exit(1);
} else if (!config.clientId) {
  console.warn(
    `${bold(red("[WARN]"))} Client ID is not set! Please check "config.json"`
  );
  process.exit(1);
} else if (!config.guildId) {
  console.warn(
    `${bold(red("[WARN]"))} Guild ID is not set! Please check "config.json"`
  );
  process.exit(1);
}

// Declare client
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: true,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 500,
  allowedMentions: {
    repliedUsers: false,
  },
  partials: [
    Partials.GuildMember,
    Partials.Channel,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
  shards: "auto",
  intents: 3276799,
});

// Make config available within client
client.config = config;

const token = client.config.token;

process.on("uncaughtException", (error) => {
  console.log(`${bold(red("[ERROR]"))} ${error}`);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(`${bold(red("[ERROR]"))} ${err} ${origin}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    `${bold(
      red("[ERROR]")
    )} Unhandled promise at: ${promise}\nReason: ${reason}`
  );
});

const functions = fs
  .readdirSync("./src/functions")
  .filter((file) => file.endsWith(".js"));

const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));

(async () => {
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
})();

client.totalEvents = eventFiles.length;

// Slash Command Stuff
client.slashCommands = new Collection();

const foldersPath = path.join(__dirname, "./slashCommands");
const slashCommandFolders = fs.readdirSync(foldersPath);

for (const folder of slashCommandFolders) {
  const slashCommandsPath = path.join(foldersPath, folder);
  const slashCommandFiles = fs
    .readdirSync(slashCommandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of slashCommandFiles) {
    const slashFilePath = path.join(slashCommandsPath, file);
    const slashCommand = require(slashFilePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in slashCommand && "execute" in slashCommand) {
      client.slashCommands.set(slashCommand.data.name, slashCommand);
    } else {
      console.log(
        `${bold(
          red("[WARN]")
        )} The slash command at ${slashFilePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Login
client.login(token);
