const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  Embed,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user from the server")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) =>
      option
        .setName("userid")
        .setDescription("Discord ID of the user to be unbanned")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { channel, options } = interaction;
    const userId = options.getString("userid");

    try {
      await interaction.guild.members.unban(userId);

      const embed = new EmbedBuilder()
        .setDescription(`<@${userId}> has been unbanned`)
        .setColor(0x5fb041)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });

      const logEmbed = new EmbedBuilder()
      .setColor('DarkRed')
      .setTitle(`Member Unbanned`)
      .addFields(
        { name: `Moderator`, value: `<@${interaction.member.id}>`, inline: true },
        { name: `Member`, value: `<@${userId}>`, inline: true }
      )
      .setThumbnail(interaction.member.displayAvatarURL({dynamic: true}))
      .setTimestamp()    

    interaction.guild.channels.fetch(config.kickBanLogs)
      .then(channel => channel.send({ embeds: [logEmbed] }))
    } catch (err) {
      console.log(err);

      const errEmbed = new EmbedBuilder()
        .setDescription(`Please provide a valid user ID`)
        .setColor(0xc723b);

      interaction.reply({ embeds: [errEmbed], ephemeral: true });
    }
  },
};
