const {
  Client,
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmute a user")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("User to unmute")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { guild, options } = interaction;
    const user = options.getUser("target");
    const member = guild.members.cache.get(user.id);

    const errEmbed = new EmbedBuilder().setColor(0xc72c3b);

    const successEmbed = new EmbedBuilder()
      .setAuthor({ name: `User Unmuted` })
      .setDescription(`${user}`)
      .setColor(0x5fb041)
      .setTimestamp();

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({
        embeds: [
          errEmbed.setDescription(
            `You cannot mute a user with a higher role than you`
          ),
        ],
        ephemeral: true,
      });

    if (
      !interaction.guild.members.me.permissions.has(
        PermissionFlagsBits.ModerateMembers
      )
    )
      return interaction.reply({
        embeds: [
          errEmbed.setDescription(
            `I do not have valid permissions to mute users`
          ),
        ],
        ephemeral: true,
      });

    try {
      await member.timeout(null);

      interaction.reply({ embeds: [successEmbed], ephemeral: false });
    } catch (err) {
      console.log(err);
    }
  },
};
