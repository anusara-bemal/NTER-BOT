const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue, playlist) => {
    const embed = new MessageEmbed()
        .setDescription(` • [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} tracks) • ${playlist.user}`)
        .setColor('#ff0000')
  
      queue.textChannel.send({ embeds: [embed] })
}