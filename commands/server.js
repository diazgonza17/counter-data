const { SlashCommandBuilder } = require('discord.js');

//Format Date export function
function formatDate(date) {
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
}

module.exports = {
  data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Devuelve informacion del server'),
  async execute(interaction) {
    await interaction.reply(`
Nombre: ${interaction.guild.name}
Miembros Totales: ${interaction.guild.memberCount}
Miembros Máximos: ${interaction.guild.maximumMembers}
Fecha de Creación: ${formatDate(interaction.guild.createdAt)}
Te uniste el: ${formatDate(interaction.guild.joinedAt)}
Lenguaje Preferido: ${interaction.guild.preferredLocale}
    `);
  },
};