const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const policyURL =
  "https://docs.google.com/document/d/1A1Irrbu7f0ulyChrKV93ahxApQRljG8mfcI5RK7wLSA/edit?usp=sharing";
const termsURL =
  "https://docs.google.com/document/d/1DtpVbOT0Ud3NHSlthWJuZ1GTF3kwUFGsHZGe8Mp4XDk/edit?usp=sharing";

module.exports = {
  config: {
    owner: false,
    category: "info",
    disabled: true,
  },
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("policy")
    .setDescription("📜 MiniVortex's Privacy Policy and Terms of Service!")
    .setDMPermission(false),

  async execute(interaction, client) {
    const termsEmbed = new EmbedBuilder()
      .setTitle("MiniVortex Terms & Privacy Policy:")
      .setThumbnail(
        "https://media.discordapp.net/attachments/1224733562247319593/1224733588734476439/R90JOg1.png?ex=661e910a&is=660c1c0a&hm=2e909df04e2838dde02f857282f4c53293b301f76a21629b70470cada7828036&=&format=webp&quality=lossless"
      )
      .setAuthor({
        name: `Xenco`,
        iconURL: `https://cdn.discordapp.com/avatars/1224370030767247480/98f140f5e36d07ede1117ab9a617b727.webp?size=1024&format=webp&width=0&height=256`,
      })
      .setColor("Red")
      .setDescription(
        `> [Privacy Policy](${policyURL})\n> [Terms of Service](${termsURL})`
      );

    return interaction.reply({ embeds: [termsEmbed] });
  },
};
