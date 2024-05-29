const { Collection } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.isCommand()) return;

    const slashCommand = interaction.client.slashCommands.get(
      interaction.commandName
    );

    if (!slashCommand) {
      return;
    }

    const serverConfig = require("../Schemas/serverConfig");
    async function getServerConfig() {
      const guildID = interaction.guild.id;
      const data = await serverConfig.findOne({ Guild: guildID });

      if (data) {
        return data;
      } else {
        serverConfig.create({
          Guild: guildID,
          premium: false,
        });

        return serverConfig.findOne({ Guild: guildID });
      }
    }

    const serverConfigData = await getServerConfig();

    const owners = client.config.ownerID;

    if (slashCommand.config.owner && !owners.includes(interaction.user.id))
      return await interaction.reply({
        content: "You are not authorized to use this command.",
        ephemeral: true,
      });

    async function checkCommandPremium() {
      if (slashCommand.config.premium) {
        return true;
      } else {
        return false;
      }
    }

    const isPremium = await checkCommandPremium();

    if (isPremium && !serverConfigData.premium)
      return await interaction.reply({
        content:
          "This command is premium only! This guild does not have premium!",
        ephemeral: true,
      });

    if (slashCommand.config.disabled) {
      return await interaction.reply({
        content: `This command is disabled. Try again later.`,
        ephemeral: true,
      });
    }
    incrementCommandUsage();

    try {
      await slashCommand.execute(interaction, client);
    } catch (error) {
      console.error(`❌ Error occured: ${error}`);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "❌ There was an error while executing this slash command!",
          ephemeral: true,
        });

        // Error Flag System
        const logChannel = await client.channels.fetch("1245169124762456085"); // Error Log Channel in Xenco Development

        const member = interaction.user.tag;
        const guild = interaction.guild.name;
        const channel = interaction.channel.name;
        const errorTime = `<t:${Math.floor(Date.now() / 1000)}:R>`;

        const embed = new Discord.EmbedBuilder()
          .setColor("Red")
          .setTitle(`❌ An error occured!`)
          .setDescription(
            `An error has occured while using a slash command!\n**Guild:** ${guild}\n**Channel:** ${channel}\n**User:** ${member}`
          )
          .setFields(
            { name: `Error Command:`, value: `\`${slashCommand.data.name}\`` },
            { name: `Error:`, value: `\`${error}\`` },
            { name: `Error Time:`, value: `${errorTime}` }
          )
          .setFooter({ text: `Error Log System` })
          .setTimestamp();

        await logChannel.send({
          content: "<@860974614905094144>",
          embeds: [embed],
        });
      } else {
        await interaction.reply({
          content: "❌ There was an error while executing this slash command!",
          ephemeral: true,
        });

        // Error Flag System
        const logChannel = await client.channels.fetch("1245169124762456085"); // Error Log Channel in Xenco Development

        const member = interaction.user.tag;
        const guild = interaction.guild.name;
        const channel = interaction.channel.name;
        const errorTime = `<t:${Math.floor(Date.now() / 1000)}:R>`;

        const embed = new Discord.EmbedBuilder()
          .setColor("Red")
          .setTitle(`❌ An error occured!`)
          .setDescription(
            `An error has occured while using a slash command!\n**Guild:** ${guild}\n**Channel:** ${channel}\n**User:** ${member}`
          )
          .setFields(
            { name: `Error Command:`, value: `\`${slashCommand.data.name}\`` },
            { name: `Error:`, value: `\`${error}\`` },
            { name: `Error Time:`, value: `${errorTime}` }
          )
          .setFooter({ text: `Error Log System` })
          .setTimestamp();

        await logChannel.send({ embeds: [embed] });
      }
    }

    async function incrementCommandUsage() {
      try {
        const commandUsage = require("../Schemas/commandUsage");

        // Attempt to find existing command usage data
        const data = await commandUsage.findOne();

        if (data) {
          // Update existing data
          data.amountOfCommandsUsed++;
          await data.save();
        } else {
          // Create new data if none exists
          const newData = new commandUsage({ amountOfCommandsUsed: 1 });
          await newData.save();
        }
      } catch (error) {
        console.error("Error incrementing command usage:", error);
      }
    }
    return;
  },
};
