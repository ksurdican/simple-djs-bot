const { EmbedBuilder, SlashCommandBuilder, Embed } = require("discord.js");
const cpuStat = require("cpu-stat");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Get info about the bot"),

  execute(interaction, client) {
    const days = Math.floor(client.uptime / 86400000);
    const hours = Math.floor(client.uptime / 3600000) % 24;
    const minutes = Math.floor(client.uptime / 60000) % 60;
    const seconds = Math.floor(client.uptime / 1000) % 60;

    cpuStat.usagePercent(function (error, percent) {
      if (error) return interaction.reply({ content: `${error}` });

      const memoryUsage = formatBytes(process.memoryUsage().heapUsed);
      const node = process.version;
      const cpu = percent.toFixed(2);

      const embed = new EmbedBuilder()
        .setAuthor({ name: `Bot Information` })
        .setColor("Blue")
        .addFields(
          { name: `Developer`, value: `lunerss`, inline: true },
          { name: `Username`, value: `${client.user.username}`, inline: true },
          { name: `User ID`, value: `${client.user.id}`, inline: true },
          { name: `Creation Date`, value: `09/01/2023` },
          {
            name: `Uptime`,
            value: ` \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, and \`${seconds}\` seconds`,
          },
          { name: `Node Version`, value: `${node}` },
          { name: `Bot Ping`, value: `${client.ws.ping}ms`, inline: true },
          { name: `CPU Usage`, value: `${cpu}%`, inline: true },
          { name: `Memory Usage`, value: `${memoryUsage}`, inline: true }
        );

      interaction.reply({ embeds: [embed] });
    });

    function formatBytes(a, b) {
      let c = 1024;
      d = b || 2;
      e = ["B", "KB", "MB", "GB", "TB"];
      f = Math.floor(Math.log(a) / Math.log(c));

      return parseFloat((a / Math.pow(c, f)).toFixed(d)) + "" + e[f];
    }
  },
};
