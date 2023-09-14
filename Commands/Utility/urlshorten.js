const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const loadshortt = require('node-url-shortener');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('urlshorten')
    .setDescription('Shorten a URL')
    .addStringOption(option => option.setName('url').setDescription('Link to shorten').setRequired(true)),

  async execute(interaction) {
    const lurl = interaction.options.getString('url');
    const regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if (!regex.exec(lurl)) return interaction.reply({ content: 'Please provide a valid URL', ephemeral: true });

    loadshortt.short(lurl, function(err, url) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: `URL Shortener`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
        .setColor('LightGrey')
        .setFooter({ text: `${interaction.guild.name} | Made by Luna`, iconURL: interaction.guild.iconURL({dynamic: true}) })
        .addFields(
          { name: `Original URL`, value: `[Click Here](${lurl})` },
          { name: `Shortened URL`, value: `[Click Here](${url})` }
        )

      return interaction.channel.send({ embeds: [embed] })
    })

  }
}