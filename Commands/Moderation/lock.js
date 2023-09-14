const { ChannelType, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../../config");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Stop users from sending messages in a channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addChannelOption((option) => option.setName("channel").setDescription("Channel to lock").addChannelTypes(ChannelType.GuildText).setRequired(false)),

  async execute(interaction, client) {
    const chan =interaction.options.getChannel("channel") || interaction.channel;

    if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return interaction.reply({ content: "You do not have permission to lock channels", ephemeral: true });

    const emb = new EmbedBuilder()
      .setColor('DarkRed')
      .setTitle(`Channel Locked`)
      .setDescription(`This channel has been locked by <@${interaction.member.id}>`);

    chan.permissionOverwrites.edit(interaction.guild.id, {SendMessages: false,});

    chan.send({ embeds: [emb] })
    interaction.reply({ content: `Channel successfully locked`, ephemeral: true })

    const logEmbed = new EmbedBuilder()
      .setColor('DarkRed')
      .setTitle(`Channel Locked`)
      .addFields(
        { name: `Moderator`, value: `<@${interaction.member.id}>`, inline: true },
        { name: `Channel`, value: `<#${chan.id}>`, inline: true }
      )
      .setThumbnail(interaction.member.displayAvatarURL({dynamic: true}))
      .setTimestamp()    

    interaction.guild.channels.fetch(config.lockedChannelLogs)
      .then(channel => channel.send({ embeds: [logEmbed] }))
  },
};
