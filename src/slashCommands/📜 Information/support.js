const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const serverURL = "https://discord.gg/BbyPHpa94h";

module.exports = {
  config: {
    owner: false,
    category: "info",
  },
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("📜 MiniVortex's Support Server!")
    .setDMPermission(false),

  async execute(interaction, client) {
    const supportEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} Support Server:`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("Orange")
      .setDescription(`> [Support Server](${serverURL})`);

    return interaction.reply({ embeds: [supportEmbed] });
  },
};
