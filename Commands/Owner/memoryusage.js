const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const os = require("os");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("memoryusage")
    .setDescription("Check system memory usage")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, client) {
    if (interaction.user.id !== "400430142221975553")
      return interaction.reply({
        content: "Only the bot owner can use this command",
        ephemeral: true,
      });

    const maxMemory = os.totalmem();

    function getMemoryUsage() {
      const free = os.freemem();
      return {
        max: memory(maxMemory),
        free: memory(free),
        used: memory(maxMemory - free),
        bot: memory(process.memoryUsage().rss),
      };
    }

    function memory(bytes = 0) {
      const gigaBytes = bytes / 1024 ** 3;
      if (gigaBytes > 1) {
        return `${gigaBytes.toFixed(1)} GB`;
      }
      const megaBytes = bytes / 1024 ** 2;
      if (megaBytes < 10) return `${megaBytes.toFixed(2)} MB`;
      if (megaBytes < 100) return `${megaBytes.toFixed(1)} MB`;
      return `${Math.floor(megaBytes)} MB`;
    }

    let memoria = getMemoryUsage();

    const embed = new EmbedBuilder()
      .setTitle(`Resource Usage`)
      .addFields(
        {
          name: "Max Memory",
          value: memoria.max,
          inline: true,
        },
        {
          name: "Free memory",
          value: memoria.free,
          inline: true,
        },
        {
          name: "Memory used by bot",
          value: memoria.bot,
          inline: true,
        }
      )
      .setColor("Random");

    await interaction.reply({ embeds: [embed] });
  },
};
