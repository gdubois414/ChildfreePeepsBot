const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config();

const data = new SlashCommandBuilder()
  .setName('meetups')
  .setDescription('current meetups being planned');

module.exports = {
  data: data,
  async execute(interaction) {
    const allChannels = await interaction.guild.channels.fetch();
    const categoryChannels = allChannels.filter(channel => {
      return channel.parentId === process.env.GUILD_CATEGORY_ID && channel.id !== process.env.EXCLUDED_CHANNEL_ID
    });
    const fields = [];

    categoryChannels.map(channel => {
      fields.push({
        name: channel.name,
        value: channel.topic ?? 'No topic for this channel'
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
