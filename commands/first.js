const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('first')
        .setDescription('Busca el primer mensaje de un canal de texto')
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Elegí un canal de texto para buscar')
    			  .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)),
  
  async execute(interaction) {
    const chan = interaction.options.getChannel('channel');
    const fetchMessages = await chan.messages.fetch({after: 1, limit: 1});
    const msg = fetchMessages.first();

    
    if(msg?.valueOf()) {
      if(msg.content !== '') {
        await interaction.reply(`El primer mensaje de **${chan.name}** fue: \n\n${msg.content} \n\nNo me crees? Fijate acá: \n${msg.url}`);
      } else {interaction.reply(`No encontré texto para leer, fijate y contame: \n${msg.url}`)};
    } else { interaction.reply(`Acá no hay nada che, me cagaron: \n${chan.url}`)};
  },
};