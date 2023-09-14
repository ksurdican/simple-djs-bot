const { CommandInteraction } = require("discord.js");
const config = require("../../config");

module.exports = {
  name: "interactionCreate",

  execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        interaction.reply({ content: "outdated command", ephemeral: true });
      }

      command.execute(interaction, client);
    } else if (interaction.isButton()) {
      const { customId } = interaction;

      if (customId === "verify") {
        const role = interaction.guild.roles.cache.get(config.verifyrole);
        return interaction.member.roles.add(role).then((member) =>
          interaction.reply({
            content: `${role} has been assigned`,
            ephemeral: true,
          })
        );
      }
    } else {
      return;
    }
  },
};
