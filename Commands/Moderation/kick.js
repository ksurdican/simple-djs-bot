const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  Embed,
} = require("discord.js");
const config = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user from the server")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option.setName("target").setDescription("User to kick").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reasong for the kick")
    ),

  async execute(interaction) {
    const { channel, options } = interaction;
    const user = options.getUser("target");
    const reason = options.getString("reason") || "No Reason Specified";
    const member = await interaction.guild.members.fetch(user.id);
    const errEmbed = new EmbedBuilder()
      .setDescription(`Cannot kick <@${user.id}> due to role heiarchy`)
      .setColor(0xc72c3b);

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.replay({ embeds: [errEmbed], ephemeral: true });

    await member.kick(reason);

    const emb = new EmbedBuilder()
      .setColor(0x5fb041)
      .setDescription(`${user} has been kicked with the reason: **${reason}**`);

    await interaction.reply({ embeds: [emb] });

    const logEmbed = new EmbedBuilder()
      .setColor('DarkRed')
      .setTitle(`Member Kicked`)
      .addFields(
        { name: `Moderator`, value: `<@${interaction.member.id}>`, inline: true },
        { name: `Member`, value: `<@${user.id}>`, inline: true },
        { name: `Reason`, value: reason }
      )
      .setThumbnail(interaction.member.displayAvatarURL({dynamic: true}))
      .setTimestamp()    

    interaction.guild.channels.fetch(config.kickBanLogs)
      .then(channel => channel.send({ embeds: [logEmbed] }))
  },
};
