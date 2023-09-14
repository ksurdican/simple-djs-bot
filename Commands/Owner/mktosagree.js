const {
  EmbedBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mktosagree")
    .setDescription("Set channel for TOS agreement message")
    .addChannelOption((option) =>
      option.setName("channel").setDescription("TOS Channel").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // requires admin perm

  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    const verifyEmbed = new EmbedBuilder()
      .setTitle(`TOS Agreement`)
      .setDescription(
        `By clicking the buttom below, you agree to all terms of service and acknowledge that any violation may result in a permanent ban.`
      )
      .setColor(0x5fb041);

    let sendChannel = channel.send({
      embeds: [verifyEmbed],
      components: [
        new ActionRowBuilder().setComponents(
          new ButtonBuilder()
            .setCustomId("agree")
            .setLabel("Agree")
            .setStyle(ButtonStyle.Success)
        ),
      ],
    });
    if (!sendChannel) {
      return interaction.reply({
        content: "Interal Error, please try again later",
        ephemeral: true,
      });
    } else {
      return interaction.reply({
        content: "TOS Agreement channel successfully set.",
        ephemeral: true,
      });
    }
  },
};
