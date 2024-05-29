const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");
const fs = require("fs");

module.exports = {
  config: {
    owner: false,
    category: "info",
  },
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("📋 List all commands or info about a specific command")
    .setDMPermission(false),
  async execute(interaction, client) {
    const commandFolders = fs
      .readdirSync("src/slashCommands/")
      .filter((folder) => !folder.startsWith("."));
    const commandsByCategory = {};

    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`src/slashCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const commands = [];

      for (const file of commandFiles) {
        const { default: command } = await import(`./../${folder}/${file}`);
        commands.push({
          name: command.data.name,
          description: command.data.description,
        });
      }

      commandsByCategory[folder] = commands;
    }

    const dropdownOptions = Object.keys(commandsByCategory).map((folder) => ({
      label: folder,
      value: folder,
    }));

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("category-select")
      .setPlaceholder("Select a category")
      .addOptions(
        ...dropdownOptions.map((option) => ({
          label: option.label,
          value: option.value,
        }))
      );

    const embed = new EmbedBuilder()
      .setTitle("🔖 Command Help:")
      .setDescription(
        "📚 Select a category from the dropdown menu to view command categories!"
      )
      .setThumbnail(`${client.user.displayAvatarURL()}`)
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true,
    });

    const filter = (i) =>
      i.isStringSelectMenu() && i.customId === "category-select";
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
    });

    collector.on("collect", async (i) => {
      const selectedCategory = i.values[0];
      const categoryCommands = commandsByCategory[selectedCategory];

      const categoryEmbed = new EmbedBuilder()
        .setTitle(`${selectedCategory} Commands`)
        .setDescription(`**Commands in ${selectedCategory.slice(2)}:**`)
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .addFields(
          categoryCommands.map((command) => ({
            name: command.name,
            value: command.description,
          }))
        );

      await i.update({ embeds: [categoryEmbed] });
    });
  },
};
