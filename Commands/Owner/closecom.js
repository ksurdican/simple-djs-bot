const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("closecom")
    .setDescription("ADMIN ONLY")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Which commissions category to close")
        .setRequired(true)
        .addChoices(
          { name: "Livery", value: "livcom" },
          { name: "Vehicle", value: "vehcom" },
          { name: "Misc", value: "misccom" }
        )
    ),

  async execute(interaction) {
    const channel = interaction.channel;
    const wCom = interaction.options.getString("category");
    const baseEmb = new EmbedBuilder()
      .setDescription(
        "Commissions have been temporarily closed and will be reopened in the near future."
      )
      .setColor("Gold")
      .setTimestamp();

    if (wCom === "livcom") {
      let livComEmb = baseEmb.setTitle("Livery Commissions Closed");
      channel.bulkDelete(5);
      interaction.reply({ content: 'Embed Sent', ephemeral: true })
      channel.send({ embeds: [livComEmb] });
    } else if (wCom === "vehcom") {
      let vehComEmb = baseEmb.setTitle("Vehicle Commissions Closed");
      channel.bulkDelete(5);
      interaction.reply({ content: 'Embed Sent', ephemeral: true })
      channel.send({ embeds: [vehComEmb] });
    } else {
      let miscComEmb = baseEmb.setTitle("Commissions Closed");
      channel.bulkDelete(5);
      interaction.reply({ content: 'Embed Sent', ephemeral: true })
      channel.send({ embeds: [miscComEmb] });
    }
  },
};
