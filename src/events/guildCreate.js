const Discord = require("discord.js");
const serverConfigSchema = require("../Schemas/serverConfig");

module.exports = {
  name: Discord.Events.GuildCreate,
  async execute(guild, client) {
    try {
      let owner = await guild.fetchOwner();

      const serverID = guild.id;

      let serverConfigData = await serverConfigSchema.findOne({
        Guild: serverID,
      });

      if (!serverConfigData) {
        serverConfigSchema.create({
          Guild: guild.id,
          premium: false,
        });
        serverConfigData = await serverConfigSchema.findOne({
          Guild: serverID,
        });
      }

      // Logging System
      const logChannel = await client.channels.fetch("1245169636874391662");

      let serverIcon = await guild.iconURL({ dynamic: true, size: 2048 });

      if (!serverIcon) {
        const guildJoinEmbed = new Discord.EmbedBuilder()
          .setTitle("Guild Join:")
          .setDescription(
            `> Guild Name: ${guild.name} (${guild.id})\n> Guild Owner: ${owner} (${owner.id})\n> Guild Users: ${guild.memberCount}\n\nI'm now in ${client.guilds.cache.size} servers!`
          )
          .setColor("Blurple")
          .setTimestamp();

        logChannel.send({ embeds: [guildJoinEmbed] });
      } else {
        const guildJoinEmbed = new Discord.EmbedBuilder()
          .setTitle("Guild Join:")
          .setDescription(
            `> Guild Name: ${guild.name} (${guild.id})\n> Guild Owner: ${owner} (${owner.id})\n> Guild Users: ${guild.memberCount}\n\nI'm now in ${client.guilds.cache.size} servers!`
          )
          .setThumbnail(serverIcon)
          .setColor("Blurple")
          .setTimestamp();

        logChannel.send({ embeds: [guildJoinEmbed] });
      }

      console.log(
        `I have joined a new guild!\n\nGuild Name: ${guild.name} (${guild.id})\nGuild Owner: ${owner} (${owner.id}\nGuild Users: ${guild.memberCount}`
      );
    } catch (error) {
      console.log("An error occurred:", error);
    }
  },
};
