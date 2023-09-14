const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

const config = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the server")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option.setName("target").setDescription("User to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Ban reason").setRequired(true)
    ),

  async execute(interaction) {
    const { channel, options } = interaction;
    const user = options.getUser("target");
    const reason = options.getString("reason") || "No Reason Provided";
    const member = await interaction.guild.members.fetch(user.id);
    const errEmbed = new EmbedBuilder()
      .setDescription(`Cannot ban <@${user.id}> due to role heiarchy`)
      .setColor(0xc72c3b);

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.replay({ embeds: [errEmbed], ephemeral: true });

    await member.ban({ reason });

    const emb = new EmbedBuilder()
      .setColor(0x5fb041)
      .setDescription(`${user} has been banned with the reason: **${reason}**`)
      .setTimestamp();

    await interaction.reply({ embeds: [emb] });

    const logEmbed = new EmbedBuilder()
      .setColor('DarkRed')
      .setTitle(`Member Banned`)
      .addFields(
        { name: `Moderator`, value: `<@${interaction.member.id}>`, inline: true },
        { name: `Member`, value: `<@${user.id}>`, inline: true },
        { name: `Reason`, value: reason}
      )
      .setThumbnail(interaction.member.displayAvatarURL({dynamic: true}))
      .setTimestamp()    

    interaction.guild.channels.fetch(config.kickBanLogs)
      .then(channel => channel.send({ embeds: [logEmbed] }))
  },
};
