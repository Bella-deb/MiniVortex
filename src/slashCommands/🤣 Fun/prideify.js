const canvafy = require("canvafy");
const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
  config: {
    owner: false,
    premium: false,
    nsfw: false,
    category: "fun",
    description: "🧑‍🤝‍🧑 Generates a gay image of your avatar!",
    usage: "prideify <user>",
  },
  cooldown: 3,
  data: new SlashCommandBuilder()
    .setName("prideify")
    .setDMPermission(false)
    .setDescription("🧑‍🤝‍🧑 Generates a pride image of your avatar!")
    .setNSFW(false)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to prideify (optional)")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser("user") || interaction.user;
    const avatarURL = user.displayAvatarURL({ size: 1024 });

    const prideImage = await canvafy.Image.gay(avatarURL);
    const attachment = new AttachmentBuilder(prideImage);
    attachment.setName(`pride-avatar-${user.username}.png`);

    await interaction.reply({
      content: `**Pride avatar of ${user.username}**`,
      files: [attachment],
    });
  },
};
