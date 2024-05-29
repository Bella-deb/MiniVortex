const Discord = require("discord.js");
const serverConfigSchema = require("../Schemas/serverConfig");

module.exports = {
  name: Discord.Events.GuildDelete,
  async execute(guild, client) {
    try {
      if (!guild) return;

      if (serverConfigSchema.findOne({ Guild: guild.id })) {
        const serverConfigData = await serverConfigSchema.findOne({
          Guild: guild.id,
        });
        await serverConfigData.deleteOne();
        console.log("Deleted server config.");
      }

      const logChannel = await client.channels.fetch("1245169636874391662");

      let owner = await guild.fetchOwner();
      let serverIcon = await guild.iconURL({ dynamic: true, size: 2048 });

      if (!serverIcon) {
        const guildJoinEmbed = new Discord.EmbedBuilder()
          .setTitle("Guild Leave:")
          .setDescription(
            `> Guild Name: ${guild.name} (${guild.id})\n> Guild Owner: ${owner} (${owner.id}\n> Guild Users: ${guild.memberCount}\n\nI'm now in ${client.guilds.cache.size} servers.`
          )
          .setColor("Random");

        logChannel.send({ embeds: [guildJoinEmbed] });
      } else {
        const guildJoinEmbed = new Discord.EmbedBuilder()
          .setTitle("Guild Leave:")
          .setDescription(
            `> Guild Name: ${guild.name} (${guild.id})\n> Guild Owner: ${owner} (${owner.id}\n> Guild Users: ${guild.memberCount}\n\nI'm now in ${client.guilds.cache.size} servers.`
          )
          .setThumbnail(serverIcon)
          .setColor("Random");

        logChannel.send({ embeds: [guildJoinEmbed] });
      }

      console.log(
        `I have left a guild!\n\nGuild Name: ${guild.name} (${guild.id})\nGuild Owner: ${owner} (${owner.id}\nGuild Users: ${guild.memberCount}`
      );
    } catch (error) {
      console.log("An error occurred:", error);
    }
  },
};
