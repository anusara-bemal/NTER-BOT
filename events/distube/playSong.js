const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, queue, track) => {
      var newQueue = client.distube.getQueue(queue.id)
      var data = disspace(newQueue, track)

      const nowplay = await queue.textChannel.send(data)

      const filter = (message) => {
        if(message.guild.me.voice.channel && message.guild.me.voice.channelId === message.member.voice.channelId) return true;
        else {
          message.reply({ content: "You need to be in a same/voice channel.", ephemeral: true });
        }
      };
      const collector = nowplay.createMessageComponentCollector({ filter, time: 120000 });

      collector.on('collect', async (message) => {
        const id = message.customId;
        const queue = client.distube.getQueue(message.guild.id);
        if(id === "pause") {
        if(!queue) {
            collector.stop();
        } 
        if (queue.paused) { 
          await client.distube.resume(message.guild.id);
          const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`\`⏯\` | **Song has been:** \`Resumed\``);
    
          message.reply({ embeds: [embed], ephemeral: true });
        } else {
          await client.distube.pause(message.guild.id);
          const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`\`⏯\` | **Song has been:** \`Paused\``);
    
          message.reply({ embeds: [embed], ephemeral: true });
        }
        } else if (id === "skip") {
          if(!queue) {
            collector.stop();
          }
          if (queue.songs.length === 1) {
            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription("\`🚨\` | **There are no** `Songs` **in queue**")

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
          await client.distube.skip(message)
            .then(song => {
                const embed = new MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription("\`⏭\` | **Song has been:** `Skipped`")

            nowplay.edit({ components: [] });
            message.reply({ embeds: [embed], ephemeral: true });
            });
          }
        } else if(id === "stop") {
          if(!queue) {
            collector.stop();
          }
  
          await client.distube.stop(message.guild.id);
  
          const embed = new MessageEmbed()
              .setDescription(`\`🚫\` | **Song has been:** | \`Stopped\``)
              .setColor('#ff0000');
          
          await nowplay.edit({ components: [] });
          message.reply({ embeds: [embed], ephemeral: true });
        } else if(id === "loop") {
          if(!queue) {
            collector.stop();
          }
          if (queue.repeatMode === 0) {
            client.distube.setRepeatMode(message.guild.id, 1);
            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`\`🔁\` | **Song is loop:** \`Current\``)

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
            client.distube.setRepeatMode(message.guild.id, 0);
            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`\`🔁\` | **Song is unloop:** \`Current\``)

            message.reply({ embeds: [embed], ephemeral: true });
          }
        } else if (id === "previous") {
          if(!queue) {
            collector.stop();
          }
          if (queue.previousSongs.length == 0) {
            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription("\`🚨\` | **There are no** `Previous` **songs**")

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
          await client.distube.previous(message)
                const embed = new MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription("\`⏮\` | **Song has been:** `Previous`")

                nowplay.edit({ components: [] });
                message.reply({ embeds: [embed], ephemeral: true });
            }
        }
      });
      collector.on('end', async (collected, reason) => {
        if(reason === "time") {
          nowplay.edit({ components: [] });
        }
      });
  }

  function disspace(nowQueue, nowTrack) {
    const embeded = new MessageEmbed()

      .setAuthor(`${nowTrack.uploader.name}`)
    //.setAuthor({ name: `${nowTrack.uploader.name}`, iconURL: 'https://cdn.discordapp.com/emojis/741605543046807626.gif'})
    .setThumbnail(nowTrack.thumbnail)
    .setColor('#ff0000')
    .setDescription(`**[${nowTrack.name}](${nowTrack.url})**`)
    //.addField(`**Uploader**:`, `**[${nowTrack.uploader.name}](${nowTrack.uploader.url})**`, true)
    .addField(`**Join Our Discord**` , `**[©ƒℓαм3'ѕ σƒƒι¢ιαℓ™ ♨](https://discord.gg/ayyT5dxU9U)**`)
    .addField(`**Requested By**`, `${nowTrack.user}`, true)
    .addField(`**Duration**`, `${nowQueue.formattedDuration}`, true)
   //.addField(` ** Viwesㅤ**`,`${nowTrack.views}`, true)
  .setImage("https://i.postimg.cc/XYFPkD8f/Media-220225-225641.gif")
    //.addField(`Current Volume:`, `${nowQueue.volume}%`, true)
    //.addField(`Filters:`, `${nowQueue.filters.join(", ") || "Normal"}`, true)
    //.addField(`Autoplay:`, `${nowQueue.autoplay ? "Activated" : "Not Active"}`, true)




//.addField(`Duration:`, `${nowQueue.formattedDuration}`, true)
      
    
    
    //.addfield(`Request by:` , `${message.author.tag}` , true)
//.addField(`Current Duration: \`[0:00 / ${nowTrack.formattedDuration}]\``, `\`\`\`🔴 | 🎶──────𝓔𝓡𝓞𝓢 𝓔 𝓒𝓘𝓣𝓨────────\`\`\``)
      
     .setFooter(" © N TER | 2022 " ) 
    //.setTimestamp()

 
    return {
      embeds: [embeded]
  
    }
  
  }
  
