const { SlashCommandBuilder, userMention } = require('discord.js');

//Format Date export function
function formatDate(date) {
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
}

module.exports = {
  data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Devuelve información del usuario')
        .addUserOption(option => option
          .setName('target')
          .setDescription('A quien querés investigar?')),
  
  async execute(interaction) {
    const target = interaction.options.getUser('target');

    if (target) {
      const date = target.createdAt;
      await interaction.reply(`
**Informe de ${userMention(target.id)}**
Nombre: ${target.username}
Muertes: ${target.id}
Juegos abandonados: ${target.discriminator}
Tutorial más rapido: ${target.createdAt.toLocaleTimeString().slice(0,8)}
Ultima partida ganada:  ${formatDate(date)}`)
    } else {
      const date = interaction.user.createdAt;
      await interaction.reply(`
**Informe de ${userMention(interaction.user.id)}**
Popularmente conocido como: ${interaction.user.username}
Asesinatos: ${interaction.user.id}
Platinos: ${interaction.user.discriminator}
Maratón más larga: ${interaction.user.createdAt.toLocaleTimeString().slice(0,8)}
Sembrando el miedo desde: ${formatDate(date)}`);
    }
  },
};