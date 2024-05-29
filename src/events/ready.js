const { bold, red, cyan, greenBright } = require("colorette");
const os = require("os");

const config = require("../config.json");
const package = require("../../package.json");

const mongoose = require("mongoose");
const mongoURL = config.mongoURL;

// Ready event for bot startup.
module.exports = {
  name: "ready",
  async execute(client) {
    // Log if MongoURL is not set
    if (!mongoURL) {
      console.warn(`${bold(red("[WARN]"))} Mongo URL is not set!`);
    }

    (async () => {
      try {
        await mongoose.connect(mongoURL || "", {});
        console.log(`[${greenBright("+")}] MongoDB Connected`);
      } catch (error) {
        console.log(`❌ Error occured: ${error}`);
      }
    })();

    console.clear();
    console.log(`${cyan("========================================")}`);
    console.log(`╠ Total Slash Commands: ${bold(client.slashCommands.size)}`);
    console.log(`╠ Total Events: ${bold(client.totalEvents)}`);
    console.log(`╠ Total Guilds: ${bold(client.guilds.cache.size)}`);
    console.log(`╠ Total Users: ${bold(client.users.cache.size)}`);
    console.log(`╠ Bot Version: ${bold("v" + package.version)}`);
    console.log(`╠ CPU: ${bold(`${os.cpus()[0].model}`)}`);
    console.log(
      `╠ Total RAM: ${bold(`${Math.round(os.totalmem() / 1024 / 1024)} MB`)}`
    );
    console.log(
      `╠ Storage Used: ${bold(
        `${Math.round((os.totalmem() - os.freemem()) / 1024 / 1024)} MB`
      )}`
    );
    console.log(`╠ Platform: ${bold(os.platform())}`);
    console.log(`╚ Launch Time: ${bold(`${new Date().toLocaleString()}`)} ◞`);
    console.log(`${cyan("========================================")}`);

    console.log(
      `[${greenBright("+")}] Logged in as ${bold(
        client.user.tag
      )} || Bot ID: ${bold(client.user.id)}`
    );

    let totalUsers = client.users.cache.size - client.guilds.cache.size;
    let totalChannels = client.channels.cache.size;
    let totalServers = client.guilds.cache.size;

    const activities = [
      `${totalUsers} users`,
      `${totalChannels} channels`,
      `${totalServers} servers`,
    ];

    let currentActivityIndex = 0;

    setInterval(() => {
      totalUsers = client.users.cache.filter((user) => !user.bot);
      totalChannels = client.channels.cache.size;
      totalServers = client.guilds.cache.size;

      currentActivityIndex = (currentActivityIndex + 1) % activities.length;
      const newActivity = activities[currentActivityIndex];
      client.user.setActivity(newActivity);
    }, 5000);
  },
};
