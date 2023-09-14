const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config');

const livChan = config.liveryCom;
const vehChan = config.vehicleCom;
const miscChan = config.miscCom;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('opencom')
    .setDescription('ADMIN ONLY')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Which commissions category to open")
        .setRequired(true)
        .addChoices(
          { name: "Livery", value: "livcom" },
          { name: "Vehicle", value: "vehcom" },
          { name: "Misc", value: "misccom" }
        )
    ),

  async execute(interaction) {
    const wCom = interaction.options.getString('category');

    if(wCom === 'livcom') {
      let lcEmbed = new EmbedBuilder()
        .setTitle("LC | Livery Comissions")
        .setDescription("All commissions have a minimum base fee of $10. This meaning, regardless of what you order the minimum price is $10.")
        .addFields(
          { name: "Livery Comission Pricing", value: "*(Pricing is per individual livery)*\n> • LEO Vehicles - $1.00 to $3.00\n> • FD Vehicles  - $2.00 to $5.00", inline: true },
          { name: "Special Package Deals", value: "> • 10+ Liveries - 10% Off\n> • 20+ Liveries - 20% Off\n> • 35+ Liveries - 30% Off", inline: false },
          { name: "Priority Orders", value: "• We offer a priority order option for commissions which allow you to pay extra in order for your order to be placed at a higher priority than others. The price of this varies on the size and complexity of your total order", inline: false },
          { name: "Important Information", value: "• Supervisor and subdivision liveries range from being $0.25 to $3.50 depending on design.\n• Payment must be made before work is started.\n• Once your commission is a work in progress, no refunds will be issued under normal circumstances.", inline: false },
        )
        .setImage("https://www.snexplores.org/wp-content/uploads/2021/05/1030_adding_subtracting_bias_feat.jpg")
        .setThumbnail("https://cdn.discordapp.com/icons/939977489470611517/d044da916c6d30c7780cb91fa632650d.webp?size=80")
        .setColor("#96d1e9")
        .setFooter({ text: "Comissions Opened: " })
        .setTimestamp();

      livChan.bulkDelete(5);
      livChan.send({ embeds: [lcEmbed] });
      interaction.reply({ content: 'Embed Sent' });
    }

    if(wCom === 'vehcom') {
      return console.log('Vehicle commission embed not setup')
    }

    if(wCom === 'misccom') {
      return console.log('Misc commission embed is not setup')
    }


  }

}