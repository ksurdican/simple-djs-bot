const { EmbedBuilder } = require("@discordjs/builders");
const { Embed, InteractionCollector, GuildMember } = require("discord.js");
const config = require("../../config");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    let channel = config.welcomeChan;
    let Role = config.welcomeRole;

    const { user, guild } = member;
    const welcomeChannel = member.guild.channels.cache.get(channel);

    const welcomeEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setDescription(`Welcome <@${member.id}> to Liberty Customs!`)
      .setTimestamp();

    welcomeChannel.send({ embeds: [welcomeEmbed] });
    member.roles.add(Role);
  },
};
