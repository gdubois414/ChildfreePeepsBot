const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config();

const data = new SlashCommandBuilder()
  .setName('meetups')
  .setDescription('current meetups being planned');

module.exports = {
  data: data,
  async execute(interaction) {
    const allChannels = await interaction.guild.channels.fetch();
    const categoryChannels = allChannels.filter(channels => channels.parentId === process.env.GUILD_CATEGORY_ID);
    console.log(categoryChannels);
    const fields = [];

    categoryChannels.map(channel => {
      fields.push({
        name: channel.name,
        value: channel.topic
      })
    })
    await interaction.reply({
      embeds: [
        {
          title: 'Our pending meetups',
          description: 'Let the mods know if you would like to be added to these channels.',
          fields
        }
      ]
    });
  },
};
