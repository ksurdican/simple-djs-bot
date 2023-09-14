const {
  Client,
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute a user in the server")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option.setName("target").setDescription("User to mute").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription(
          "Duration for the user to be muted (Ex: 1d, 1h, 1m, 1s)"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the user to be muted")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { guild, options } = interaction;
    const user = options.getUser("target");
    const member = guild.members.cache.get(user.id);
    const time = options.getString("duration");
    const convertedTime = ms(time);
    const reason = options.getString("reason") || "No Reason Provided";

    const errEmbed = new EmbedBuilder().setColor(0xc72c3b);

    const successEmbed = new EmbedBuilder()
      .setAuthor({ name: `User Muted` })
      .setDescription(`${user}`)
      .addFields(
        { name: "Reason", value: `${reason}`, inline: true },
        { name: "Duration", value: `${time}`, inline: true }
      )
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

    if (!convertedTime)
      return interaction.reply({
        embeds: [
          errEmbed.setDescription(
            `Error with time input, please try again later`
          ),
        ],
        ephemeral: true,
      });

    try {
      await member.timeout(convertedTime, reason);

      interaction.reply({ embeds: [successEmbed], ephemeral: false });
    } catch (err) {
      console.log(err);
      interaction.reply({
        embeds: [errEmbed.setDescription(`Unknown Error Occured`)],
        ephemeral: true,
      });
    }
  },
};
